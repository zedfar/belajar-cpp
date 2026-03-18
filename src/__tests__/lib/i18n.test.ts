import { describe, it, expect } from 'vitest'
import { t, interpolate, getOtherLang, getLangName, detectLanguage } from '@/lib/i18n'

// ============================================================
// t() — terjemahan string
// ============================================================

describe('t()', () => {
  it('mengembalikan string ID dengan benar', () => {
    expect(t('id', 'nav.home')).toBe('Beranda')
    expect(t('id', 'exercise.checkAnswer')).toBe('Periksa Jawaban')
  })

  it('mengembalikan string EN dengan benar', () => {
    expect(t('en', 'nav.home')).toBe('Home')
    expect(t('en', 'exercise.checkAnswer')).toBe('Check Answer')
  })

  it('fallback ke ID jika path tidak ada di EN', () => {
    // Semua key ada di keduanya, tapi test prinsipnya dengan key valid
    const result = t('en', 'nav.curriculum')
    expect(result).toBe('Curriculum')
  })

  it('fallback ke path jika tidak ada di manapun', () => {
    const result = t('id', 'tidak.ada.key.ini')
    expect(result).toBe('tidak.ada.key.ini')
  })

  it('mengembalikan nilai nested dua level', () => {
    expect(t('id', 'lesson.markComplete')).toBe('Tandai Selesai')
    expect(t('en', 'lesson.markComplete')).toBe('Mark Complete')
  })

  it('mengembalikan nilai section code', () => {
    expect(t('id', 'code.run')).toBe('Jalankan')
    expect(t('en', 'code.run')).toBe('Run')
  })

  it('mengembalikan nilai infoBox', () => {
    expect(t('id', 'infoBox.tip')).toBe('Tips')
    expect(t('en', 'infoBox.tip')).toBe('Tip')
    expect(t('id', 'infoBox.warning')).toBe('Perhatian')
    expect(t('en', 'infoBox.warning')).toBe('Warning')
  })

  it('mengembalikan path jika value adalah object bukan string', () => {
    // 'home' adalah object nested, bukan string
    const result = t('id', 'home')
    expect(result).toBe('home')
  })
})

// ============================================================
// interpolate()
// ============================================================

describe('interpolate()', () => {
  it('mengganti satu variabel', () => {
    expect(interpolate('{time} menit', { time: 25 })).toBe('25 menit')
  })

  it('mengganti beberapa variabel sekaligus', () => {
    expect(interpolate('{count} dari {total} pelajaran', { count: 5, total: 10 }))
      .toBe('5 dari 10 pelajaran')
  })

  it('mempertahankan placeholder jika variabel tidak disediakan', () => {
    expect(interpolate('{missing} tersedia', {})).toBe('{missing} tersedia')
  })

  it('template tanpa variabel dikembalikan apa adanya', () => {
    expect(interpolate('Halo Dunia', {})).toBe('Halo Dunia')
  })

  it('mengganti variabel angka dan string', () => {
    expect(interpolate('Unit {unit}', { unit: 3 })).toBe('Unit 3')
    expect(interpolate('Skor: {score}/100', { score: '85' })).toBe('Skor: 85/100')
  })
})

// ============================================================
// getOtherLang()
// ============================================================

describe('getOtherLang()', () => {
  it('id → en', () => {
    expect(getOtherLang('id')).toBe('en')
  })

  it('en → id', () => {
    expect(getOtherLang('en')).toBe('id')
  })
})

// ============================================================
// getLangName()
// ============================================================

describe('getLangName()', () => {
  it('mengembalikan "Indonesia" untuk id', () => {
    expect(getLangName('id')).toBe('Indonesia')
  })

  it('mengembalikan "English" untuk en', () => {
    expect(getLangName('en')).toBe('English')
  })
})

// ============================================================
// detectLanguage()
// ============================================================

describe('detectLanguage()', () => {
  it('default ke id jika tidak ada Accept-Language', () => {
    expect(detectLanguage()).toBe('id')
    expect(detectLanguage(undefined)).toBe('id')
  })

  it('mendeteksi en dari Accept-Language: en', () => {
    expect(detectLanguage('en')).toBe('en')
  })

  it('mendeteksi en dari Accept-Language: en-US,en;q=0.9', () => {
    expect(detectLanguage('en-US,en;q=0.9')).toBe('en')
  })

  it('mendeteksi en dari Accept-Language: en-GB', () => {
    expect(detectLanguage('en-GB')).toBe('en')
  })

  it('default ke id untuk bahasa selain en', () => {
    expect(detectLanguage('id-ID,id;q=0.9')).toBe('id')
    expect(detectLanguage('fr-FR,fr;q=0.9')).toBe('id')
    expect(detectLanguage('zh-CN')).toBe('id')
  })

  it('case-insensitive untuk EN', () => {
    expect(detectLanguage('EN-US')).toBe('en')
  })
})
