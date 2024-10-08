const Pegawai = require("../models/PegawaiModel");

exports.ReadPegawai = async (req, res) => {
  try {
    const pegawai = await Pegawai.find();
    res.status(200).json({
      success: true,
      data: pegawai,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data pegawai",
      error: error.message,
    });
  }
};
exports.AddPegawai = async (req, res) => {
  try {
    const { nik, name, sektor, teknisi, nohp, mitra } = req.body;

    if (!name || !nik || !sektor || !teknisi || !nohp || !mitra) {
      return res.status(400).json({ message: "Silahkan isi terlebih dahulu!" });
    }

    const addPegawai = new Pegawai({
      nik: nik,
      name: name,
      sektor: sektor,
      teknisi: teknisi,
      nohp: nohp,
      mitra: mitra,
    });
    await addPegawai.save();

    return res
      .status(201)
      .json({ message: "Pegawai berhasil ditambah", addPegawai });
  } catch (error) {
    console.error("Terjadi keasalahan saat penambahan data : " + error);
  }
};
exports.EditPegawai = async (req, res) => {
  try {
    const pegawaiId = req.body.id;
    const { nik, name, sektor, teknisi, nohp, mitra } = req.body;
    if (!name || !nik || !sektor || !teknisi || !nohp || !mitra) {
      return res.status(400).json({ message: "Silahkan isi terlebih dahulu!" });
    }

    const editPegawai = await Pegawai.findByIdAndUpdate(
      pegawaiId,
      {
        nik: nik,
        name: name,
        sektor: sektor,
        teknisi: teknisi,
        nohp: nohp,
        mitra: mitra,
      },
      { new: true }
    );

    if (!editPegawai) {
      return res.status(404).json({ message: "Pegawai tidak ditemukan!" });
    }

    res.status(200).json({
      success: true,
      message: "Pegawai berhasil diupdate!",
      data: editPegawai,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengupdate pegawai",
      error: error.message,
    });
  }
};
exports.DeletePegawai = async (req, res) => {
  try {
    const pegawaiId = req.body.id;

    const pegawai = await Pegawai.findByIdAndDelete(pegawaiId);

    if (!pegawai) {
      return res.status(404).json({ message: "Pegawai tidak ditemukan!" });
    }

    res.status(200).json({
      success: true,
      message: "Pegawai berhasil dihapus!",
      data: pegawai,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menghapus pegawai",
      error: error.message,
    });
  }
};
