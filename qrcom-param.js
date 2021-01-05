
// maximum data size in byte per a QR code.
// note: corelation to the number of the version and errorCorrectionLevel.
// see https://www.qrcode.com/en/about/version.html
const max_data_len = 512;

// version 15 (77x77), scale 4px looks suitable for PDA display.
// It results the capacity is 512 bytes.
const qrcom_gen_opts = {
    errorCorrectionLevel: "L", // Error Correction Level: L, M (default), Q, H
    version: 15, // 1 to 40
    scale: 4, // in px
};

// colors whether a QR code has been successfully received or not.
const qrcom_color_done = '#56b4e9';
const qrcom_color_notyet = '#d55e00';
const qrcom_color_passing = '#d55e00';

// multi-language
const qrcom_btn_camera_on = 'Camera ON';
const qrcom_btn_camera_off = 'Camera OFF';
const qrcom_btn_gen = 'Make QR code';
const qrcom_btn_passing_prepare = 'QR code passing';
const qrcom_btn_passing_start = 'Start passing';

//const qrcom_btn_camera_on = 'カメラ起動';
//const qrcom_btn_camera_off = 'カメラ停止';
//const qrcom_btn_gen = 'コード生成';
//const qrcom_btn_passing_prepare = '連続表示準備';
//const qrcom_btn_passing_start = '連続表示開始';

const camera_read_interval = 16;

/*
 * 2 Byte Header
 *   1バイト目: 総フラグメント数を示す。'A'ならば1個。'9'ならば62個。
 *   2バイト目: 何番目のフラグメントかを示す。'A'ならば1個目。'9'ならば62個目。
 *   e.g. QRコードが1個だけの場合は、0x65, 0x65 (AA) となる。
 *   e.g. QRコードが3個あり、1つ目のデータは、0x67, 0x65 (CA) となる。
 */
const qrcom_max_nb_frags = 62;
const qrcom_frag_idx = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
