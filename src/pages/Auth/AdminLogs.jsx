import React, { useState, useCallback, useMemo } from "react";
import api from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

/* -------------------------------------------------------------
   Helpers
------------------------------------------------------------- */

/**
 * Parse morgan dateRaw like "20/Jul/2025:13:29:48 +0000" -> Date
 */
function parseMorganDate(dateRaw) {
  if (!dateRaw) return null;
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(\d{2})\/([A-Za-z]{3})\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) ([+\-]\d{4})$/;
  const m = re.exec(dateRaw);
  if (!m) return null;
  const [, dd, monStr, yyyy, hh, mm, ss, tz] = m;
  const monMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };
  const month = monMap[monStr];
  if (month == null) return null;
  const tzIso = tz.slice(0, 3) + ":" + tz.slice(3);
  const iso = `${yyyy}-${String(month + 1).padStart(
    2,
    "0"
  )}-${dd}T${hh}:${mm}:${ss}${tzIso}`;
  const dt = new Date(iso);
  return isNaN(dt.getTime()) ? null : dt;
}

function formatDateDisplay(dateRaw) {
  const d = parseMorganDate(dateRaw);
  if (!d) return dateRaw ?? "";
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

function statusClasses(status) {
  if (status >= 500) return "text-destructive font-medium";
  if (status >= 400) return "text-red-500 font-medium";
  if (status >= 300) return "text-yellow-600 font-medium";
  if (status >= 200) return "text-green-600 font-medium";
  return "text-muted-foreground";
}

const DEFAULT_ENDPOINT = "/logs";

function AdminLogs({ endpoint = DEFAULT_ENDPOINT }) {
  const [limitInput, setLimitInput] = useState("");
  const [logs, setLogs] = useState([]);
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // UI filter states
  const [search, setSearch] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const params = {};
      const n = parseInt(limitInput, 10);
      if (!isNaN(n) && n > 0) params.limit = n;

      const res = await api.get(endpoint, { params });
      setLogs(Array.isArray(res.data?.data) ? res.data.data : []);
      setCount(
        typeof res.data?.count === "number"
          ? res.data.count
          : res.data?.data?.length ?? 0
      );
    } catch (err) {
      console.error("Failed to fetch logs:", err);
      setLoadError(
        err?.response?.data?.error || err?.message || "Failed to load logs."
      );
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, limitInput]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      return (
        (selectedMethod ? log.method === selectedMethod : true) &&
        (selectedStatus ? log.status === Number(selectedStatus) : true) &&
        (search
          ? log.url.toLowerCase().includes(search.toLowerCase()) ||
            log.userAgent.toLowerCase().includes(search.toLowerCase())
          : true)
      );
    });
  }, [logs, search, selectedMethod, selectedStatus]);

  const methods = useMemo(
    () => [...new Set(logs.map((l) => l.method))],
    [logs]
  );
  const statuses = useMemo(
    () => [...new Set(logs.map((l) => l.status))],
    [logs]
  );

  /* -----------------------------------------------------------
     Render
  ----------------------------------------------------------- */
  if (isLoading) return <Loading />;
  if (loadError) {
    return (
      <div className="p-4">
        <Error message={loadError} />
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={fetchLogs}
            className="flex items-center gap-1"
          >
            <AlertTriangle className="w-4 h-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const total = count ?? logs.length;

  return (
    <section className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <Label htmlFor="log-limit">Limit (optional)</Label>
          <Input
            id="log-limit"
            type="number"
            min={1}
            placeholder="e.g. 100"
            value={limitInput}
            onChange={(e) => setLimitInput(e.target.value)}
            className="w-32"
          />
        </div>
        <Button type="button" onClick={fetchLogs}>
          Fetch
        </Button>
        <Input
          placeholder="Search URL or Agent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <Select
          value={selectedMethod || "__all__"}
          onValueChange={(v) => setSelectedMethod(v === "__all__" ? "" : v)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All</SelectItem>
            {methods.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedStatus || "__all__"}
          onValueChange={(v) => setSelectedStatus(v === "__all__" ? "" : v)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={String(s)}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {total != null && (
          <span className="text-sm text-muted-foreground">
            Showing {filteredLogs.length} of {total} logs.
          </span>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[70vh] rounded-md border">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="hidden md:table-cell">IP</TableHead>
              <TableHead className="hidden lg:table-cell">Referrer</TableHead>
              <TableHead className="hidden xl:table-cell">UA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-6 text-center text-muted-foreground"
                >
                  No logs match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log, i) => (
                <TableRow key={`${log._file || "f"}-${i}`}>
                  <TableCell>{formatDateDisplay(log.dateRaw)}</TableCell>
                  <TableCell>{log.method}</TableCell>
                  <TableCell className={statusClasses(log.status)}>
                    {log.status}
                  </TableCell>
                  <TableCell className="break-all">{log.url}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {log.remoteAddr}
                  </TableCell>
                  <TableCell
                    className="hidden lg:table-cell max-w-[200px]"
                    title={log.referrer || ""}
                  >
                    {log.referrer || (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell
                    className="hidden xl:table-cell max-w-[240px]"
                    title={log.userAgent}
                  >
                    {log.userAgent}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default AdminLogs;
