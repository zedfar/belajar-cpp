export interface GlossaryTerm {
  term: string
  termEn?: string       // English name if different
  category: 'dasar' | 'tipe-data' | 'kontrol' | 'fungsi' | 'array-struct' | 'io' | 'kompilasi'
  definition: {
    id: string
    en: string
  }
  example?: string      // Short code snippet
  seeAlso?: string[]    // Other term keys
}

export const GLOSSARY: GlossaryTerm[] = [
  // ── KOMPILASI & RUNTIME ──────────────────────────────────────
  {
    term: 'Compiler',
    category: 'kompilasi',
    definition: {
      id: 'Program yang mengubah kode C++ menjadi file executable yang bisa dijalankan oleh komputer. Di Windows biasanya menghasilkan file .exe.',
      en: 'A program that converts C++ source code into an executable file that the computer can run.',
    },
    example: 'g++ hello.cpp -o hello',
  },
  {
    term: 'Compile Time',
    category: 'kompilasi',
    definition: {
      id: 'Proses saat kode kamu dikompilasi oleh compiler. Error yang terjadi di tahap ini disebut compile-time error dan mencegah program dijalankan.',
      en: 'The process when your code is compiled by the compiler. Errors at this stage are called compile-time errors and prevent the program from running.',
    },
    seeAlso: ['Runtime'],
  },
  {
    term: 'Runtime',
    category: 'kompilasi',
    definition: {
      id: 'Saat program sedang berjalan (dieksekusi). Error yang terjadi saat program berjalan disebut runtime error.',
      en: 'When the program is actively running (executing). Errors that occur while the program runs are called runtime errors.',
    },
    seeAlso: ['Compile Time'],
  },
  {
    term: 'Sintaks (Syntax)',
    category: 'kompilasi',
    definition: {
      id: 'Aturan penulisan kode yang harus diikuti. Seperti tata bahasa dalam bahasa manusia — salah satu karakter saja bisa menyebabkan error.',
      en: 'The rules for writing code that must be followed. Like grammar in human languages — even one wrong character can cause an error.',
    },
  },
  {
    term: 'Bug',
    category: 'kompilasi',
    definition: {
      id: 'Kesalahan dalam program yang menyebabkan perilaku yang tidak diinginkan. Bisa berupa compile error, runtime error, atau logic error.',
      en: 'An error in a program that causes unintended behavior. Can be a compile error, runtime error, or logic error.',
    },
  },

  // ── DASAR ────────────────────────────────────────────────────
  {
    term: '#include',
    category: 'dasar',
    definition: {
      id: 'Direktif yang memberitahu compiler untuk menyertakan isi sebuah file header ke dalam program kamu.',
      en: 'A directive that tells the compiler to include the contents of a header file in your program.',
    },
    example: '#include <iostream>',
  },
  {
    term: 'Namespace',
    category: 'dasar',
    definition: {
      id: 'Wadah yang mengelompokkan nama-nama (fungsi, variabel, kelas) agar tidak bertabrakan. `std::` adalah namespace standar C++.',
      en: 'A container that groups names (functions, variables, classes) to avoid naming conflicts. `std::` is the C++ standard namespace.',
    },
    example: 'using namespace std;',
    seeAlso: ['std'],
  },
  {
    term: 'std',
    termEn: 'std (Standard Library)',
    category: 'dasar',
    definition: {
      id: 'Namespace standar C++ yang berisi semua fungsi dan objek bawaan seperti `cout`, `cin`, `string`, dan lainnya.',
      en: 'The C++ standard namespace containing all built-in functions and objects like `cout`, `cin`, `string`, and more.',
    },
    example: 'std::cout << "Halo";',
  },
  {
    term: 'Variabel',
    termEn: 'Variable',
    category: 'dasar',
    definition: {
      id: 'Tempat penyimpanan data dalam memori yang diberi nama. Nilainya bisa berubah selama program berjalan.',
      en: 'A named storage location in memory. Its value can change while the program runs.',
    },
    example: 'int umur = 15;',
    seeAlso: ['Konstanta'],
  },
  {
    term: 'Konstanta',
    termEn: 'Constant',
    category: 'dasar',
    definition: {
      id: 'Seperti variabel, tetapi nilainya tidak bisa diubah setelah ditetapkan. Dideklarasikan dengan kata kunci `const`.',
      en: 'Like a variable, but its value cannot be changed after it is set. Declared with the `const` keyword.',
    },
    example: 'const double PI = 3.14159;',
    seeAlso: ['Variabel'],
  },
  {
    term: 'Operator',
    category: 'dasar',
    definition: {
      id: 'Simbol yang melakukan operasi pada nilai. Contoh: `+` (tambah), `-` (kurang), `*` (kali), `/` (bagi), `%` (modulo), `==` (sama dengan).',
      en: 'A symbol that performs an operation on values. Examples: `+` (add), `-` (subtract), `*` (multiply), `/` (divide), `%` (modulo), `==` (equal to).',
    },
  },
  {
    term: 'Ekspresi',
    termEn: 'Expression',
    category: 'dasar',
    definition: {
      id: 'Kombinasi nilai, variabel, dan operator yang menghasilkan suatu nilai. Contoh: `5 + 3`, `x * 2`, `a > b`.',
      en: 'A combination of values, variables, and operators that produces a value. Examples: `5 + 3`, `x * 2`, `a > b`.',
    },
  },
  {
    term: 'Statement',
    category: 'dasar',
    definition: {
      id: 'Satu perintah lengkap dalam C++, biasanya diakhiri dengan titik koma (`;`). Contoh: `int x = 5;` atau `cout << x;`.',
      en: 'A single complete instruction in C++, usually ending with a semicolon (`;`). Examples: `int x = 5;` or `cout << x;`.',
    },
  },
  {
    term: 'Komentar',
    termEn: 'Comment',
    category: 'dasar',
    definition: {
      id: 'Teks dalam kode yang diabaikan oleh compiler. Digunakan untuk menjelaskan kode. `//` untuk satu baris, `/* */` untuk beberapa baris.',
      en: 'Text in code ignored by the compiler. Used to explain the code. `//` for single line, `/* */` for multiple lines.',
    },
    example: '// Ini komentar',
  },

  // ── TIPE DATA ────────────────────────────────────────────────
  {
    term: 'int',
    category: 'tipe-data',
    definition: {
      id: 'Tipe data untuk bilangan bulat (tanpa desimal). Contoh: -10, 0, 42. Biasanya memakan 4 byte memori.',
      en: 'Data type for whole numbers (no decimals). Examples: -10, 0, 42. Usually takes 4 bytes of memory.',
    },
    example: 'int nilai = 90;',
  },
  {
    term: 'double',
    category: 'tipe-data',
    definition: {
      id: 'Tipe data untuk bilangan desimal dengan presisi tinggi (64-bit). Lebih akurat dari `float`.',
      en: 'Data type for decimal numbers with high precision (64-bit). More accurate than `float`.',
    },
    example: 'double pi = 3.14159265;',
    seeAlso: ['float'],
  },
  {
    term: 'float',
    category: 'tipe-data',
    definition: {
      id: 'Tipe data untuk bilangan desimal dengan presisi standar (32-bit). Lebih hemat memori dari `double` tapi kurang presisi.',
      en: 'Data type for decimal numbers with standard precision (32-bit). Uses less memory than `double` but less precise.',
    },
    example: 'float suhu = 36.5f;',
    seeAlso: ['double'],
  },
  {
    term: 'char',
    category: 'tipe-data',
    definition: {
      id: 'Tipe data untuk satu karakter. Ditulis dengan tanda kutip tunggal (`\'`). Contoh: `\'A\'`, `\'5\'`, `\'!\'`.',
      en: 'Data type for a single character. Written with single quotes (`\'`). Examples: `\'A\'`, `\'5\'`, `\'!\'`.',
    },
    example: "char huruf = 'A';",
  },
  {
    term: 'string',
    category: 'tipe-data',
    definition: {
      id: 'Tipe data untuk teks (rangkaian karakter). Ditulis dengan tanda kutip ganda (`"`). Perlu `#include <string>`.',
      en: 'Data type for text (a sequence of characters). Written with double quotes (`"`). Requires `#include <string>`.',
    },
    example: 'string nama = "Budi";',
  },
  {
    term: 'bool',
    category: 'tipe-data',
    definition: {
      id: 'Tipe data Boolean yang hanya punya dua nilai: `true` (benar) atau `false` (salah). Sering digunakan dalam kondisi.',
      en: 'Boolean data type with only two values: `true` or `false`. Often used in conditions.',
    },
    example: 'bool lulus = true;',
  },

  // ── KONTROL ALUR ─────────────────────────────────────────────
  {
    term: 'if-else',
    category: 'kontrol',
    definition: {
      id: 'Struktur percabangan untuk mengeksekusi blok kode berbeda berdasarkan kondisi. Jika kondisi true, jalankan blok `if`; jika tidak, jalankan blok `else`.',
      en: 'A branching structure that executes different code blocks based on a condition. If the condition is true, run the `if` block; otherwise run the `else` block.',
    },
    example: 'if (nilai >= 70) { cout << "Lulus"; } else { cout << "Tidak lulus"; }',
  },
  {
    term: 'switch',
    category: 'kontrol',
    definition: {
      id: 'Percabangan berdasarkan nilai tepat dari sebuah variabel. Alternatif dari banyak `if-else` untuk nilai diskrit.',
      en: 'Branching based on the exact value of a variable. An alternative to many `if-else` chains for discrete values.',
    },
    seeAlso: ['if-else', 'break'],
  },
  {
    term: 'while',
    category: 'kontrol',
    definition: {
      id: 'Perulangan yang terus berjalan selama kondisinya `true`. Kondisi dicek di awal — jika langsung false, loop tidak dieksekusi sama sekali.',
      en: 'A loop that keeps running as long as its condition is `true`. The condition is checked first — if immediately false, the loop never executes.',
    },
    example: 'while (x > 0) { x--; }',
    seeAlso: ['for', 'do-while'],
  },
  {
    term: 'for',
    category: 'kontrol',
    definition: {
      id: 'Perulangan dengan tiga bagian: inisialisasi, kondisi, dan update. Cocok untuk jumlah iterasi yang sudah diketahui.',
      en: 'A loop with three parts: initialization, condition, and update. Best when the number of iterations is known.',
    },
    example: 'for (int i = 0; i < 10; i++) { ... }',
    seeAlso: ['while', 'do-while'],
  },
  {
    term: 'do-while',
    category: 'kontrol',
    definition: {
      id: 'Perulangan yang selalu dieksekusi minimal satu kali, karena kondisi dicek di akhir bukan di awal.',
      en: 'A loop that always executes at least once, because the condition is checked at the end, not the beginning.',
    },
    example: 'do { x++; } while (x < 10);',
    seeAlso: ['while', 'for'],
  },
  {
    term: 'break',
    category: 'kontrol',
    definition: {
      id: 'Perintah untuk keluar dari loop atau switch secara paksa, langsung menuju kode setelah blok loop/switch.',
      en: 'A command to forcefully exit a loop or switch, jumping directly to the code after the loop/switch block.',
    },
    seeAlso: ['continue'],
  },
  {
    term: 'continue',
    category: 'kontrol',
    definition: {
      id: 'Perintah untuk melewati sisa iterasi saat ini dan langsung lanjut ke iterasi berikutnya dalam loop.',
      en: 'A command to skip the rest of the current iteration and immediately move to the next iteration in a loop.',
    },
    seeAlso: ['break'],
  },

  // ── FUNGSI ───────────────────────────────────────────────────
  {
    term: 'Fungsi',
    termEn: 'Function',
    category: 'fungsi',
    definition: {
      id: 'Blok kode yang diberi nama dan bisa dipanggil berkali-kali. Memungkinkan kode digunakan ulang dan lebih terorganisir.',
      en: 'A named block of code that can be called multiple times. Allows code reuse and better organization.',
    },
    example: 'int tambah(int a, int b) { return a + b; }',
    seeAlso: ['Parameter', 'Return Value', 'Overloading'],
  },
  {
    term: 'Parameter',
    category: 'fungsi',
    definition: {
      id: 'Variabel yang dideklarasikan di dalam tanda kurung fungsi. Parameter menerima nilai (argumen) saat fungsi dipanggil.',
      en: 'A variable declared inside the function\'s parentheses. Parameters receive values (arguments) when the function is called.',
    },
    seeAlso: ['Argumen', 'Fungsi'],
  },
  {
    term: 'Argumen',
    termEn: 'Argument',
    category: 'fungsi',
    definition: {
      id: 'Nilai nyata yang dikirim ke fungsi saat pemanggilan. Argumen mengisi parameter yang didefinisikan di fungsi.',
      en: 'The actual value sent to a function when it is called. Arguments fill in the parameters defined in the function.',
    },
    seeAlso: ['Parameter'],
  },
  {
    term: 'Return Value',
    category: 'fungsi',
    definition: {
      id: 'Nilai yang dikembalikan oleh fungsi ke pemanggil menggunakan kata kunci `return`. Tipe return ditulis sebelum nama fungsi.',
      en: 'The value returned by a function to its caller using the `return` keyword. The return type is written before the function name.',
    },
    example: 'return a + b;',
    seeAlso: ['void'],
  },
  {
    term: 'void',
    category: 'fungsi',
    definition: {
      id: 'Tipe return yang berarti fungsi tidak mengembalikan nilai apapun.',
      en: 'A return type meaning the function does not return any value.',
    },
    example: 'void sapa() { cout << "Halo!"; }',
    seeAlso: ['Return Value'],
  },
  {
    term: 'Overloading',
    termEn: 'Function Overloading',
    category: 'fungsi',
    definition: {
      id: 'Mendefinisikan beberapa fungsi dengan nama yang sama tetapi parameter yang berbeda (tipe atau jumlah). Compiler memilih versi yang tepat secara otomatis.',
      en: 'Defining multiple functions with the same name but different parameters (type or count). The compiler automatically selects the right version.',
    },
    seeAlso: ['Fungsi', 'Parameter'],
  },
  {
    term: 'Pass by Value',
    category: 'fungsi',
    definition: {
      id: 'Cara pengiriman argumen ke fungsi dimana salinan nilai dikirim. Perubahan pada parameter di dalam fungsi tidak mempengaruhi variabel asli.',
      en: 'A way of passing arguments to a function where a copy of the value is sent. Changes to the parameter inside the function do not affect the original variable.',
    },
    seeAlso: ['Pass by Reference'],
  },
  {
    term: 'Pass by Reference',
    category: 'fungsi',
    definition: {
      id: 'Cara pengiriman argumen dimana referensi ke variabel asli dikirim (menggunakan `&`). Perubahan di dalam fungsi mempengaruhi variabel asli.',
      en: 'A way of passing arguments where a reference to the original variable is sent (using `&`). Changes inside the function affect the original variable.',
    },
    example: 'void gandakan(int& x) { x *= 2; }',
    seeAlso: ['Pass by Value'],
  },
  {
    term: 'Scope',
    category: 'fungsi',
    definition: {
      id: 'Area dalam kode dimana sebuah variabel bisa diakses. Variabel di dalam `{}` hanya bisa diakses di dalam blok itu (local scope).',
      en: 'The area in code where a variable can be accessed. Variables inside `{}` can only be accessed within that block (local scope).',
    },
    seeAlso: ['Variabel'],
  },

  // ── ARRAY & STRUCT ───────────────────────────────────────────
  {
    term: 'Array',
    category: 'array-struct',
    definition: {
      id: 'Kumpulan nilai dengan tipe yang sama yang disimpan secara berurutan di memori. Diakses menggunakan indeks yang dimulai dari 0.',
      en: 'A collection of values of the same type stored sequentially in memory. Accessed using an index starting from 0.',
    },
    example: 'int nilai[5] = {80, 90, 75, 95, 85};',
    seeAlso: ['Indeks'],
  },
  {
    term: 'Indeks',
    termEn: 'Index',
    category: 'array-struct',
    definition: {
      id: 'Nomor posisi elemen dalam array. Selalu dimulai dari 0, bukan 1. Array dengan 5 elemen memiliki indeks 0 sampai 4.',
      en: 'The position number of an element in an array. Always starts from 0, not 1. An array with 5 elements has indices 0 through 4.',
    },
    seeAlso: ['Array'],
  },
  {
    term: 'Struct',
    category: 'array-struct',
    definition: {
      id: 'Tipe data buatan sendiri yang mengelompokkan beberapa variabel berbeda tipe menjadi satu kesatuan. Digunakan untuk merepresentasikan objek nyata.',
      en: 'A custom data type that groups several variables of different types into one unit. Used to represent real-world objects.',
    },
    example: 'struct Siswa { string nama; int umur; double nilai; };',
    seeAlso: ['Array'],
  },

  // ── INPUT/OUTPUT ─────────────────────────────────────────────
  {
    term: 'cout',
    category: 'io',
    definition: {
      id: 'Objek output standar C++ untuk menampilkan teks ke layar. Digunakan bersama operator `<<`. Bagian dari namespace `std`.',
      en: 'The standard C++ output object for displaying text on screen. Used with the `<<` operator. Part of the `std` namespace.',
    },
    example: 'cout << "Halo, Dunia!" << endl;',
    seeAlso: ['cin', 'endl'],
  },
  {
    term: 'cin',
    category: 'io',
    definition: {
      id: 'Objek input standar C++ untuk membaca input dari pengguna (keyboard). Digunakan bersama operator `>>`.',
      en: 'The standard C++ input object for reading user input (keyboard). Used with the `>>` operator.',
    },
    example: 'cin >> nama;',
    seeAlso: ['cout'],
  },
  {
    term: 'endl',
    category: 'io',
    definition: {
      id: 'Pindah ke baris baru dalam output. Selain memindahkan baris, juga melakukan flush buffer. Alternatif: `"\\n"`.',
      en: 'Moves to a new line in output. Besides moving to a new line, it also flushes the buffer. Alternative: `"\\n"`.',
    },
    example: 'cout << "Baris 1" << endl << "Baris 2";',
    seeAlso: ['cout'],
  },
  {
    term: 'File I/O',
    category: 'io',
    definition: {
      id: 'Kemampuan membaca dan menulis data ke/dari file. Menggunakan `ofstream` (output file) dan `ifstream` (input file) dari header `<fstream>`.',
      en: 'The ability to read and write data to/from files. Uses `ofstream` (output file) and `ifstream` (input file) from the `<fstream>` header.',
    },
    example: 'ofstream file("data.txt");',
    seeAlso: ['cout', 'cin'],
  },
]

export type GlossaryCategory = GlossaryTerm['category']

export const CATEGORY_LABELS: Record<GlossaryCategory, { id: string; en: string }> = {
  'dasar': { id: 'Dasar', en: 'Basics' },
  'tipe-data': { id: 'Tipe Data', en: 'Data Types' },
  'kontrol': { id: 'Kontrol Alur', en: 'Flow Control' },
  'fungsi': { id: 'Fungsi', en: 'Functions' },
  'array-struct': { id: 'Array & Struct', en: 'Array & Struct' },
  'io': { id: 'Input/Output', en: 'Input/Output' },
  'kompilasi': { id: 'Kompilasi', en: 'Compilation' },
}

export const CATEGORY_ORDER: GlossaryCategory[] = [
  'kompilasi', 'dasar', 'tipe-data', 'kontrol', 'fungsi', 'array-struct', 'io',
]
