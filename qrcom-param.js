// language
const qrcom_lang = 'en';

// colors whether a QR code has been successfully received or not.
const qrcom_color_done = '#56b4e9';
const qrcom_color_notyet = '#d55e00';
const qrcom_color_passing = '#d55e00';

// interval in milisecond to take an image and trying to get QR code.
const camera_read_interval = 16;

// ********
// don't need to touch unless you want to add other language.
const qrcom_msg = {
    init: function(lang) {
        this.lang = lang;
        if (lang == 'ja') {
            this.btn_camera_on = 'カメラ起動';
            this.btn_camera_off = 'カメラ停止';
            this.btn_gen = 'コード生成';
            this.btn_passing_prepare = '連続表示準備';
            this.btn_passing_start = '連続表示開始';
        } else {
            this.btn_camera_on = 'Camera ON';
            this.btn_camera_off = 'Camera OFF';
            this.btn_gen = 'Make QR code';
            this.btn_passing_prepare = 'QR code passing';
            this.btn_passing_start = 'Start passing';
        }
        return this
    },
};

// ********
// Below should not be changed.

// maximum data size in byte per a QR code.
// note: corelation to the number of the version and errorCorrectionLevel.
// see https://www.qrcode.com/en/about/version.html
// the value must be minus 2 (for QRcom header size defined below).
//const max_data_len = 518;
const max_data_len = 756;

// version 15 (77x77), scale 4px looks suitable for PDA display.
// It results the capacity is 512 bytes.
const qrcom_gen_opts = {
    errorCorrectionLevel: "L", // Error Correction Level: L, M (default), Q, H
    version: 15, // 1 to 40
    scale: 4, // in px
};

// QR code's Alphanumeric. i.e. BASE45, not BASE62.
// qrcom_alphabet is also used as the fragment index.
const qrcom_alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"

/*
 * 2 Byte Header
 *   1B: The number of fragments. e.g. '0' means 1. ':' means 62.
 *   2B: Fragment index. e.g. '0' means the first fragment.
 *   e.g. If there is only one fragment, the header of the first fragment
 *        is '0', '0'.
 *   e.g. If the total number of fragment is 12, the header of the first
 *        fragment is 'B', '0'.
 */
const qrcom_frag_idx = qrcom_alphabet;
const qrcom_max_nb_frags = qrcom_alphabet.length;
