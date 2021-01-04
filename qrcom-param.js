
const camera_read_interval = 16;

const qrcom_gen_opts = {
    errorCorrectionLevel: "L", // Error Correction Level: L, M, Q, H
};

// colors whether a QR code has been successfully received or not.
const qrcom_color_done = '#56b4e9';
const qrcom_color_notyet = '#d55e00';
const qrcom_color_passing = '#d55e00';

// maximum data size in byte per a QR code.
const max_data_len = 512;

/*
 * 2 Byte Header
 *   1バイト目: 総フラグメント数を示す。'A'ならば1個。'9'ならば62個。
 *   2バイト目: 何番目のフラグメントかを示す。'A'ならば1個目。'9'ならば62個目。
 *   e.g. QRコードが1個だけの場合は、0x65, 0x65 (AA) となる。
 *   e.g. QRコードが3個あり、1つ目のデータは、0x67, 0x65 (CA) となる。
 */
const qrcom_max_nb_frags = 62;
const qrcom_frag_idx = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
