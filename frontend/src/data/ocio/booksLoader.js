const STORAGE_KEY = 'books-list'
export const BOOKS_LIST_VERSION = 2

export function createBooksLoader(initialBooksData) {
  const mergeBooksWithDefaults = (savedBooks) => {
    const knownTitles = new Set(savedBooks.map((book) => book.title))
    const missingBooks = initialBooksData.filter((book) => !knownTitles.has(book.title))
    return missingBooks.length > 0 ? [...savedBooks, ...missingBooks] : savedBooks
  }

  return () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) {
        localStorage.setItem(`${STORAGE_KEY}-version`, String(BOOKS_LIST_VERSION))
        return initialBooksData
      }

      const parsed = JSON.parse(saved)
      const merged = mergeBooksWithDefaults(parsed)
      const storedVersion = localStorage.getItem(`${STORAGE_KEY}-version`)
      const needsPersist =
        merged.length !== parsed.length ||
        storedVersion !== String(BOOKS_LIST_VERSION)

      if (needsPersist) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
        localStorage.setItem(`${STORAGE_KEY}-version`, String(BOOKS_LIST_VERSION))
      }

      return merged
    } catch {
      return initialBooksData
    }
  }
}

export const booksStorageKey = STORAGE_KEY
