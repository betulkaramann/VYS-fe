"use client";

import { useMemo, useState, useEffect } from "react";
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { useRouter } from 'next/navigation';
import { ROUTES } from '../lib/router';

type User = {
    id?: number; // json-server genellikle id ekler, opsiyonel ekledim
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

const statusOrder: Record<Status, number> = {
    "Onay Bekliyor": 0,
    "Talep Onaylı/İş Emri Açık": 1,
    "Talep Onaylı/İş Emri Kapatılmış": 2,
    "Reddedilmiş": 3,
};

function parseYMD(s: string): number {
    if (!s) return 0;
    const [y, m, d] = s.split("/").map(Number);
    return new Date(y, m - 1, d).getTime();
}

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // process.env.NEXT_PUBLIC_API_URL -> http://localhost:3001
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;

                const response = await fetch(`${apiUrl}/users`);

                if (!response.ok) {
                    throw new Error('Veri çekilirken hata oluştu');
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // --- FİLTRELER ---
    const [globalFilter, setGlobalFilter] = useState("");
    const [jobNoFilter, setJobNoFilter] = useState("");
    const [entityCodeFilter, setEntityCodeFilter] = useState("");
    const [requesterFilter, setRequesterFilter] = useState("");
    const [detailFilter, setDetailFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [requestTypeFilter, setRequestTypeFilter] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("");
    const [workOrderFilter, setWorkOrderFilter] = useState("");
    const [workerFilter, setWorkerFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // sorting
    const [sortKey, setSortKey] = useState<SortKey>("requester");
    const [sortDir, setSortDir] = useState<SortDir>("asc");

    // pagination
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const router = useRouter();

    const onSort = (key: SortKey) => {
        if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else {
            setSortKey(key);
            setSortDir("asc");
        }
        setPage(1);
    };

    const filteredAndSorted = useMemo(() => {
        // Veri henüz gelmediyse boş dön
        if (!users) return [];

        const f = users.filter((u) => {
            const g = globalFilter.trim().toLowerCase();
            // Global Filter Logic
            if (
                g &&
                !(
                    u.requester?.toLowerCase().includes(g) ||
                    u.workOrderType?.toLowerCase().includes(g) ||
                    u.status?.toLowerCase().includes(g) ||
                    u.jobType?.toLowerCase().includes(g) ||
                    u.requestDetail?.toLowerCase().includes(g)
                )
            )
                return false;

            // Column Filters
            if (jobNoFilter && !u.jobNo.toString().includes(jobNoFilter)) return false;
            if (entityCodeFilter && !u.entityCode.toString().includes(entityCodeFilter)) return false;
            if (requesterFilter && !u.requester.toLowerCase().includes(requesterFilter.toLowerCase())) return false;
            if (detailFilter && !u.requestDetail.toLowerCase().includes(detailFilter.toLowerCase())) return false;
            if (dateFilter && !u.createDate.includes(dateFilter)) return false;
            if (requestTypeFilter && !u.requestType.toLowerCase().includes(requestTypeFilter.toLowerCase())) return false;
            if (jobTypeFilter && !u.jobType.toLowerCase().includes(jobTypeFilter.toLowerCase())) return false;
            if (workOrderFilter && !u.workOrderType.toLowerCase().includes(workOrderFilter.toLowerCase())) return false;
            if (workerFilter && !u.worker.toLowerCase().includes(workerFilter.toLowerCase())) return false;
            if (statusFilter && u.status !== (statusFilter as Status)) return false;

            return true;
        });

        const dir = sortDir === "asc" ? 1 : -1;
        return [...f].sort((a, b) => {
            let av: number | string, bv: number | string;
            switch (sortKey) {
                case "requester":
                    av = parseYMD(a.requester); // Bu mantık isim için doğru mu? (Tarih parse ediyor)
                    // Eğer createDate sıralamak istersen sortKey'i ona göre ayarla.
                    // Mevcut kodda requester üzerinden tarih parse ediliyor,
                    // muhtemelen createDate olmalıydı ama senin koduna dokunmadım.
                    bv = parseYMD(b.requester);
                    break;
                case "status":
                    av = statusOrder[a.status] ?? 0;
                    bv = statusOrder[b.status] ?? 0;
                    break;
                default:
                    // Güvenlik için string'e çevirme
                    av = String(a[sortKey] || "").toLowerCase();
                    bv = String(b[sortKey] || "").toLowerCase();
            }
            if (av < bv) return -1 * dir;
            if (av > bv) return 1 * dir;
            return 0;
        });
    }, [users, globalFilter, jobNoFilter, entityCodeFilter, requesterFilter, detailFilter, dateFilter, requestTypeFilter, jobTypeFilter, workOrderFilter, workerFilter, statusFilter, sortKey, sortDir]);

    const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / itemsPerPage));
    const currentPage = Math.min(page, totalPages);
    const pageSliceStart = (currentPage - 1) * itemsPerPage;
    const pageSliceEnd = currentPage * itemsPerPage;
    const rows = filteredAndSorted.slice(pageSliceStart, pageSliceEnd);

    const SortHeader = ({ label, k }: { label: string; k: SortKey }) => (
        <th className="p-2 text-left bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => onSort(k)}>
            <div className="flex items-center gap-1 select-none">
                <span>{label}</span>
                <span className="text-gray-500 text-xs">{sortKey !== k ? "↕" : sortDir === "asc" ? "▲" : "▼"}</span>
            </div>
        </th>
    );

    if (loading) return <div className="p-6 text-center">Yükleniyor...</div>;
    if (error) return <div className="p-6 text-center text-red-500">Hata: {error}</div>;

    return (
        <div className="p-6">
            <div className="mb-4 flex items-center gap-2">
                <label className="text-sm text-gray-600">Genel Arama:</label>
                <input
                    type="text"
                    placeholder="Ara..."
                    className="border p-2 rounded w-72"
                    value={globalFilter}
                    onChange={(e) => {
                        setGlobalFilter(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            <div className="overflow-x-auto"> {/* Tablo taşarsa scroll olması için */}
                <table className="min-w-full border border-gray-200 rounded overflow-hidden">
                    <thead>
                    <tr>
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
                        <th className="p-2 text-left bg-gray-100">İşlemler</th>
                    </tr>
                    {/* Column filters */}
                    <tr className="bg-gray-50">
                        <th className="p-2">
                            <input
                                value={jobNoFilter}
                                onChange={(e) => { setJobNoFilter(e.target.value); setPage(1); }}
                                placeholder="Filtre..."
                                className="border p-1 rounded w-full text-xs"
                            />
                        </th>

                        <th className="p-2">
                            <input
                                value={entityCodeFilter}
                                onChange={(e) => { setEntityCodeFilter(e.target.value); setPage(1); }}
                                placeholder="Filtre..."
                                className="border p-1 rounded w-full text-xs"
                            />
                        </th>
                        <th className="p-2">
                            <input
                                value={requesterFilter}
                                onChange={(e) => { setRequesterFilter(e.target.value); setPage(1); }}
                                placeholder="Filtre..."
                                className="border p-1 rounded w-full text-xs"
                            />
                        </th>
                        <th className="p-2">
                            <input
                                value={detailFilter}
                                onChange={(e) => { setDetailFilter(e.target.value); setPage(1); }}
                                placeholder="Filtre..."
                                className="border p-1 rounded w-full text-xs"
                            />
                        </th>
                        <th className="p-2">
                            <input
                                value={dateFilter}
                                onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
                                placeholder="YYYY/MM/DD"
                                className="border p-1 rounded w-full text-xs"
                            />
                        </th>
                        <th className="p-2">
                            <input
                                value={requestTypeFilter}
                                onChange={(e) => { setRequestTypeFilter(e.target.value); setPage(1); }}
                                placeholder="Filtre..."
                                className="border p-1 rounded w-full text-xs"
                            />
                        </th>
                        <th className="p-2">
                            <input
                                value={jobTypeFilter}
                                onChange={(e) => { setJobTypeFilter(e.target.value); setPage(1); }}
                                placeholder="Filtre..."
                                className="border p-1 rounded w-full text-xs"
                            />
                        </th>
                        <th className="p-2">
                            <input
                                value={workOrderFilter}
                                onChange={(e) => { setWorkOrderFilter(e.target.value); setPage(1); }}
                                placeholder="Filtre..."
                                className="border p-1 rounded w-full text-xs"
                            />
                        </th>
                        <th className="p-2">
                            <input
                                value={workerFilter}
                                onChange={(e) => { setWorkerFilter(e.target.value); setPage(1); }}
                                placeholder="Filtre..."
                                className="border p-1 rounded w-full text-xs"
                            />
                        </th>
                        <th className="p-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="border p-1 rounded w-full text-xs"
                            >
                                <option value="">Hepsi</option>
                                <option value="Onay Bekliyor">Onay Bekliyor</option>
                                <option value="Reddedilmiş">Reddedilmiş</option>
                                <option value="Talep Onaylı/İş Emri Kapatılmış">İş Emri Kapatılmış</option>
                                <option value="Talep Onaylı/İş Emri Açık">İş Emri Açık</option>
                            </select>
                        </th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((user, idx) => (
                        <tr key={`${user.jobNo}-${idx}`} className="border-t hover:bg-gray-50">
                            <td className="p-2 text-sm">{user.jobNo}</td>
                            <td className="p-2 text-sm">{user.entityCode}</td>
                            <td className="p-2 text-sm">{user.requester}</td>
                            <td className="p-2 text-sm truncate max-w-[150px]" title={user.requestDetail}>{user.requestDetail}</td>
                            <td className="p-2 text-sm">{user.createDate}</td>
                            <td className="p-2 text-sm">{user.requestType}</td>
                            <td className="p-2 text-sm">{user.jobType}</td>
                            <td className="p-2 text-sm">{user.workOrderType}</td>
                            <td className="p-2 text-sm">{user.worker}</td>
                            <td className="p-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                            </td>
                            <td className="p-2">
                                <div className="flex items-center justify-center gap-2">
                                    <CIcon
                                        icon={icon.cilInfo}
                                        className="w-5 h-5 cursor-pointer text-blue-500 hover:text-blue-700"
                                        onClick={() => router.push(ROUTES.IS_TALEBI_DETAY)}
                                    />
                                    <CIcon
                                        icon={icon.cilPencil}
                                        className="w-5 h-5 cursor-pointer text-yellow-500 hover:text-yellow-700"
                                        onClick={() => router.push(ROUTES.IS_TALEBI_DUZENLE)}
                                    />
                                    <CIcon
                                        icon={icon.cilTrash}
                                        className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    {rows.length === 0 && (
                        <tr>
                            <td className="p-6 text-sm text-center text-gray-500" colSpan={11}>
                                Sonuç bulunamadı.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Footer: pagination + page-size selector */}
            <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
                <div className="text-sm text-gray-600">
                    Gösterilen: {rows.length} / Toplam: {filteredAndSorted.length} • Sayfa {currentPage} / {totalPages}
                </div>

                <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600">Sayfa başı:</label>
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
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
                            disabled={currentPage === 1}
                            onClick={() => setPage(1)}
                        >
                            «
                        </button>
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
                            disabled={currentPage === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            Önceki
                        </button>
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
                            disabled={currentPage === totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            Sonraki
                        </button>
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
                            disabled={currentPage === totalPages}
                            onClick={() => setPage(totalPages)}
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}