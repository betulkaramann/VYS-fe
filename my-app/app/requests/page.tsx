
"use client";

import { useMemo, useState } from "react";
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../lib/router';

type User = {
  jobNo: number;
  entityCode: number;
  requester: string;
  requestDetail: string;
  createDate: string;
  requestType: string;
  jobType: string;
  workOrderType: string;
  worker: string;
  status: Status;
};

type SortKey = keyof User;
type SortDir = "asc" | "desc";

type Status =
  | "Onay Bekliyor"
  | "Talep Onaylı/İş Emri Açık"
  | "Talep Onaylı/İş Emri Kapatılmış"
  | "Reddedilmiş";

const statusColors: Record<Status, string> = {
  "Onay Bekliyor": "bg-gray-400 text-white",
  "Talep Onaylı/İş Emri Açık": "bg-red-500 text-white",
  "Talep Onaylı/İş Emri Kapatılmış": "bg-green-500 text-white",
  "Reddedilmiş": "bg-blue-500 text-white",
};

const statusTitles: Record<Status, string> = {
  "Onay Bekliyor": "Talep onay bekliyor.",
  "Talep Onaylı/İş Emri Açık": "Talep onaylandı, iş emri açık.",
  "Talep Onaylı/İş Emri Kapatılmış": "Talep onaylandı, iş emri kapatıldı.",
  "Reddedilmiş": "Talep reddedildi.",
};

const statusOrder: Record<Status, number> = {
  "Onay Bekliyor": 0,
  "Talep Onaylı/İş Emri Açık": 1,
  "Talep Onaylı/İş Emri Kapatılmış": 2,
  "Reddedilmiş": 3,
};

const users: User[] = [
  { jobNo: 1, entityCode: 3262, requester: "Cem Yılmaz", requestDetail: "Klima tamiri gerekiyor.", createDate: "2023/10/25", requestType: "Klima Tamiri", jobType: "Bakım", workOrderType: "Bakım Onarım Talebi", worker: "Ayşe Demir", status: "Onay Bekliyor" },
  { jobNo: 2, entityCode: 3263, requester: "Şebnem Ferah", requestDetail: "Tavan lambası arızalı.", createDate: "2023/10/26", requestType: "Elektrik Tamiri", jobType: "Elektrik", workOrderType: "Elektrik İş Emri", worker: "Ahmet Kaya", status: "Talep Onaylı/İş Emri Açık" },
  { jobNo: 3, entityCode: 3264, requester: "Haluk Levent", requestDetail: "Toplantı odasındaki sandalyenin ayağı kırık.", createDate: "2023/10/26", requestType: "Mobilya Tamiri", jobType: "Marangozluk", workOrderType: "Mobilya Tamir Talebi", worker: "Mehmet Çelik", status: "Reddedilmiş" },
  { jobNo: 4, entityCode: 3265, requester: "Tarkan Tevetoğlu", requestDetail: "Sunucu odasının duvarları boyanacak.", createDate: "2023/10/27", requestType: "Boya İşleri", jobType: "Genel Bakım", workOrderType: "Genel Bakım Talebi", worker: "Hakan Altun", status: "Talep Onaylı/İş Emri Açık" },
  { jobNo: 5, entityCode: 3266, requester: "Sertab Erener", requestDetail: "Mutfakta su kaçağı var.", createDate: "2023/10/28", requestType: "Sıhhi Tesisat", jobType: "Tesisat", workOrderType: "Tesisat İş Emri", worker: "Zeynep Öztürk", status: "Talep Onaylı/İş Emri Kapatılmış" },
  { jobNo: 6, entityCode: 3267, requester: "Sezen Aksu", requestDetail: "Yeni bir masa talebi.", createDate: "2023/10/28", requestType: "Yeni Donanım", jobType: "Satın Alma", workOrderType: "Tedarik Talebi", worker: "Ali Yılmaz", status: "Onay Bekliyor" },
  { jobNo: 7, entityCode: 3268, requester: "Barış Manço", requestDetail: "Pencere camı değişimi.", createDate: "2023/10/29", requestType: "Pencere Tamiri", jobType: "Cam İşleri", workOrderType: "Bakım Onarım Talebi", worker: "Canan Ersoy", status: "Talep Onaylı/İş Emri Açık" },
  { jobNo: 8, entityCode: 3269, requester: "Ajda Pekkan", requestDetail: "İnternet bağlantısı kesik.", createDate: "2023/10/29", requestType: "Ağ Sorunu", jobType: "BT Destek", workOrderType: "BT Destek Talebi", worker: "Emre Akın", status: "Onay Bekliyor" },
  { jobNo: 9, entityCode: 3270, requester: "Feridun Düzağaç", requestDetail: "Yazıcı çalışmıyor.", createDate: "2023/10/30", requestType: "Yazıcı Tamiri", jobType: "BT Destek", workOrderType: "BT Destek Talebi", worker: "Fatma Güneş", status: "Talep Onaylı/İş Emri Kapatılmış" },
  { jobNo: 10, entityCode: 3271, requester: "Nilüfer", requestDetail: "Kahve makinesi bozuk.", createDate: "2023/10/30", requestType: "Cihaz Tamiri", jobType: "Bakım", workOrderType: "Genel Bakım Talebi", worker: "Gökhan Saygı", status: "Onay Bekliyor" },
];

function parseYMD(s: string): number {
  const [y, m, d] = s.split("/").map(Number);
  return new Date(y, m - 1, d).getTime();
}

export default function UserTable() {
  // global + per-column filters
  const [globalFilter, setGlobalFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [regFilter, setRegFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // sorting
  const [sortKey, setSortKey] = useState<SortKey>("requester");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // pagination
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // NEW: dynamic page size

  const onSort = (key: SortKey) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const filteredAndSorted = useMemo(() => {
    const f = users.filter((u) => {
      const g = globalFilter.trim().toLowerCase();
      if (
        g &&
        !(
          u.requester.toLowerCase().includes(g) ||
          u.workOrderType.toLowerCase().includes(g) ||
          u.status.toLowerCase().includes(g) ||
          u.jobType.includes(g)
        )
      )
        return false;

      if (nameFilter && !u.requester.toLowerCase().includes(nameFilter.toLowerCase())) return false;
      if (regFilter && !u.jobType.includes(regFilter)) return false;
      if (roleFilter && !u.workOrderType.toLowerCase().includes(roleFilter.toLowerCase())) return false;
      if (statusFilter && u.status !== (statusFilter as Status)) return false;

      return true;
    });

    const dir = sortDir === "asc" ? 1 : -1;
    return [...f].sort((a, b) => {
      let av: number | string, bv: number | string;
      switch (sortKey) {
        case "requester":
          av = parseYMD(a.requester);
          bv = parseYMD(b.requester);
          break;
        case "status":
          av = statusOrder[a.status];
          bv = statusOrder[b.status];
          break;
        default:
          av = (a[sortKey] as string).toLowerCase();
          bv = (b[sortKey] as string).toLowerCase();
      }
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [globalFilter, nameFilter, regFilter, roleFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageSliceStart = (currentPage - 1) * itemsPerPage;
  const pageSliceEnd = currentPage * itemsPerPage;
  const rows = filteredAndSorted.slice(pageSliceStart, pageSliceEnd);

  const SortHeader = ({ label, k }: { label: string; k: SortKey }) => (
    <th className="p-2 text-left">
      <button className="inline-flex items-center gap-1 select-none" onClick={() => onSort(k)}>
        <span>{label}</span>
        <span className="text-gray-400 text-xs">{sortKey !== k ? "↕" : sortDir === "asc" ? "▲" : "▼"}</span>
      </button>
    </th>
  );
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <label className="text-sm text-gray-600">Filter:</label>
        <input
          type="text"
          placeholder="type string…"
          className="border p-2 rounded w-72"
          value={globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <table className="min-w-full border border-gray-200 rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <SortHeader label="İş No" k="jobNo" />
            <SortHeader label="Varlık Kodu" k="entityCode" />
            <SortHeader label="Talep Eden" k="requester" />
            <SortHeader label="Talep Açıklaması" k="requestDetail" />
            <SortHeader label="Oluşturma Tarihi" k="createDate" />
            <SortHeader label="Talep Tanımı" k="requestType" />
            <SortHeader label="İş Tipi Tanımı" k="jobType" />
            <SortHeader label="İş Emri Türü Tanımı" k="workOrderType" />
            <SortHeader label="İş Sorumlusu" k="worker" />
            <SortHeader label="Onay Durumu" k="status" />
            <th className="p-2 text-left">Action</th>
          </tr>
          {/* Column filters */}
          <tr className="bg-gray-50">
            <th className="p-2">
              <input
                value={nameFilter}
                onChange={(e) => {
                  setNameFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="filter…"
                className="border p-1 rounded w-full text-sm"
              />
            </th>
            
            <th className="p-2">
              <input
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="filter…"
                className="border p-1 rounded w-full text-sm"
              />
            </th>
            <th className="p-2">
              <input
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="filter…"
                className="border p-1 rounded w-full text-sm"
              />
            </th>
            <th className="p-2">
              <input
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="filter…"
                className="border p-1 rounded w-full text-sm"
              />
            </th>
            <th className="p-2">
              <input
                value={regFilter}
                onChange={(e) => {
                  setRegFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="YYYY/MM/DD"
                className="border p-1 rounded w-full text-sm"
              />
            </th>
            <th className="p-2">
              <input
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="filter…"
                className="border p-1 rounded w-full text-sm"
              />
            </th>
            <th className="p-2">
              <input
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="filter…"
                className="border p-1 rounded w-full text-sm"
              />
            </th>
            <th className="p-2">
              <input
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="filter…"
                className="border p-1 rounded w-full text-sm"
              />
            </th>
            <th className="p-2">
              <input
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                placeholder="filter…"
                className="border p-1 rounded w-full text-sm"
              />
            </th>
            <th className="p-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="border p-1 rounded w-full text-sm"
              >
                <option value="">Hepsi</option>
                <option value="Active">Onay Bekliyor</option>
                <option value="Pending">Reddedilmiş</option>
                <option value="Inactive">Talep Onaylı/İş Emri Kapatılmış</option>
                <option value="Banned">Talep Onaylı/İş Emri Açık</option>
              </select>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((user, idx) => (
            <tr key={`${user.jobNo}-${idx}`} className="border-t hover:bg-gray-50">
              <td className="p-2">{user.jobNo}</td>
              <td className="p-2">{user.entityCode}</td>
              <td className="p-2">{user.requester}</td>
              <td className="p-2">{user.requestDetail}</td>
              <td className="p-2">{user.createDate}</td>
              <td className="p-2">{user.requestType}</td>
              <td className="p-2">{user.jobType}</td>
              <td className="p-2">{user.workOrderType}</td>
              <td className="p-2">{user.worker}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[user.status]}`}>
                  {user.status}
                </span>
              </td>
              <td className="p-2">
                <div className="flex items-center justify-center gap-2">
                  <CIcon icon={icon.cilInfo} className="w-6 h-6" onClick={() => {
                  router.push(ROUTES.IS_TALEBI_DETAY);
                }}/>
                  <CIcon icon={icon.cilPencil} className="w-6 h-6" onClick={() => {
                   router.push(ROUTES.IS_TALEBI_DUZENLE);
                }} />
                  <CIcon icon={icon.cilTrash} className="w-6 h-6" />
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td className="p-6 text-sm text-gray-500" colSpan={5}>
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Footer: pagination + page-size selector */}
      <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
        <div className="text-sm text-gray-600">
          Showing {rows.length} of {filteredAndSorted.length} • Page {currentPage} / {totalPages}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Items per page:</label>
          <select
            className="border p-1 rounded"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setPage(1)}
              aria-label="First page"
            >
              «
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              Prev
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              Next
            </button>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setPage(totalPages)}
              aria-label="Last page"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}