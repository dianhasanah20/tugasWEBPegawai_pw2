
import React, { useState, useEffect } from "react";

function App() {
  const [pegawai, setPegawai] = useState([]);
  const [form, setForm] = useState({ nama: "", jabatan: "", gaji: "" });
  const [loading, setLoading] = useState(false);
  const apiUrl = "http://localhost:8000/api/pegawai";

  // GET
  const fetchPegawai = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    setPegawai(data);
  };

  useEffect(() => {
    fetchPegawai();
  }, []);

  // INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ nama: "", jabatan: "", gaji: "" });
    setLoading(false);
    fetchPegawai();
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchPegawai();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Manajemen Pegawai</h1>

      {/* FORM */}
      <form style={styles.card} onSubmit={handleSubmit}>
        <h3 style={styles.cardTitle}>Tambah Pegawai</h3>

        <input
          style={styles.input}
          name="nama"
          placeholder="Nama"
          value={form.nama}
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          name="jabatan"
          placeholder="Jabatan"
          value={form.jabatan}
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          name="gaji"
          placeholder="Gaji"
          type="number"
          value={form.gaji}
          onChange={handleChange}
          required
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Daftar Pegawai</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Gaji</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {pegawai.map((p) => (
              <tr key={p.id}>
                <td>{p.nama}</td>
                <td>{p.jabatan}</td>
                <td>Rp {p.gaji.toLocaleString()}</td>
                <td>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(p.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pegawai.length === 0 && (
          <p style={{ textAlign: "center", color: "#777" }}>
            Belum ada data pegawai.
          </p>
        )}
      </div>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
  },

  cardTitle: {
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    background: "#3b82f6",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  deleteButton: {
    background: "#ef4444",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;
