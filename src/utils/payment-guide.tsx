export const payment_guide = {
  virtual_account: {
    BCA: {
      via: ['ATM BCA', 'KlikBCA', 'm-BCA'],
      body: [
        'Pilih pembayaran melalui BCA VA.',
        'Catat nomor Virtual Account yang Anda dapat.',
        'Gunakan channel BCA untuk menyelesaikan pembayaran.',
        'Masukkan PIN Anda.',
        "Pilih 'Transfer ke BCA Virtual Account'.",
        'Masukkan nomor Virtual Account yang Anda dapat sebelumnya.',
        'Pastikan detail pembayaran Anda benar & masukkan item pembayaran yang akan dibayar.',
        'Pembayaran Anda dengan BCA VA selesai.',
      ],
    },
    Mandiri: {
      via: ['ATM Mandiri', 'Internet Banking', 'SMS Banking'],
      body: [
        'Pilih pembayaran melalui Mandiri Bill Payment.',
        'Catat kode pembayaran yang Anda dapat.',
        'Gunakan ATM mandiri untuk menyelesaikan pembayaran.',
        'Masukkan PIN Anda.',
        'Pilih ‘Bayar/Beli’, lalu pilih ‘Lainnya’.',
        'Pilih ‘Multi Payment’.',
        'Masukkan ‘70012’ sebagai kode perusahaan Midtrans.',
        'Masukkan kode pembayaran yang Anda dapat sebelumnya, lalu pilih ‘Benar’.',
        'Pastikan detail pembayaran Anda benar & masukkan item pembayaran yang akan dibayar, lalu pilih ‘Ya’.',
        'Pembayaran Anda dengan Mandiri Bill Payment selesai.',
      ],
    },
    BNI: {
      via: ['ATM BNI', 'ATM Prima', 'ATM Alto', 'ATM Bersama'],
      body: [
        'Pilih pembayaran melalui Bank Transfer/Virtual Account.',
        'Catat 16 digit nomor virtual account & nominal pembayaran Anda.',
        'Gunakan ATM yang memiliki jaringan ATM Bersama/Prima/Alto untuk menyelesaikan pembayaran.',
        'Masukkan PIN Anda.',
        "Di menu utama pilih 'Transaksi lainnya'.",
        "Pilih 'Transfer' lalu pilih 'Ke Rek Bank Lain'.",
        "Masukkan kode bank BNI '009' lalu pilih 'Benar'.",
        "Masukkan nominal pembayaran lalu pilih 'Benar'.",
        "Masukkan 16 digit virtual account tujuan pembayaran lalu pilih 'Benar'.",
        'Pilih rekening yang akan didebet.',
        "Pastikan nominal pembayaran & nomor virtual account sudah benar terisi, lalu pilih 'Benar'.",
        'Pembayaran Anda dengan BNI Virtual Account selesai.',
      ],
    },
    Permata: {
      via: ['ATM Permata', 'ATM Prima', 'ATM Alto', 'ATM Bersama'],
      body: [
        'Pilih pembayaran melalui Bank Transfer/Virtual Account.',
        'Catat 16 digit nomor virtual account & nominal pembayaran Anda.',
        'Gunakan ATM yang memiliki jaringan ATM Bersama/Prima/Alto untuk menyelesaikan pembayaran.',
        'Masukkan PIN Anda.',
        'Di menu utama pilih ‘Others’.',
        'Pilih ‘Transfer’ lalu pilih ‘other bank account’.',
        'Masukkan kode bank permata ‘013’ diikuti dengan 16 digit nomor virtual account.',
        'Masukkan nominal pembayaran lalu pilih ‘Correct’.',
        'Pastikan nominal pembayaran & nomor virtual account sudah benar terisi, lalu pilih ‘Correct’.',
        'Pembayaran Anda dengan Virtual Account selesai.',
      ],
    },
  },

  e_wallet: {
    Gopay: {
      via: ['Mobile App', 'QR Code'],
      body: [
        [
          'Pilih pembayaran melalui GoPay.',
          'Aplikasi Gojek Anda akan terbuka.',
          'Lihat detail pembayaran pada aplikasi Gojek Anda dan tekan Pay.',
          'Masukkan nomor pin GoPay Anda.',
          'Pembayaran dengan menggunakan GoPay selesai.',
        ],
        [
          'Pilih pembayaran melalui GoPay.',
          'Buka aplikasi Gojek dan tekan tombol Scan QR.',
          'Scan kode QR yang muncul pada halaman pembayaran.',
          'Lihat detail pembayaran dan tekan Pay.',
          'Masukkan nomor pin GoPay Anda.',
          'Pembayaran dengan menggunakan GoPay selesai.',
        ],
      ],
    },
  },

  credit_card: {
    BCA: {
      via: ['VISA', 'MasterCard', 'JCB', 'Amex'],
      body: [
        'Pilih pembayaran melalui Kartu.',
        'Masukkan 16 angka nomor kartu disertai dengan expiration date dan CVV.',
        'Pastikan detail pembayaran Anda telah benar untuk melanjutkan ke step 3D Secure.',
        'One Time Password (OTP) akan dikirimkan ke nomor ponsel Anda yang terdaftar dengan kartu yang Anda gunakan.',
        'Masukkan OTP yang Anda dapat ke halaman 3D Secure.',
        'Pembayaran Anda dengan Kartu Kredit selesai.',
      ],
    },
  },
}
