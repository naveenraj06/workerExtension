import { useEffect, useState } from 'react'

const BookmarksList = () => {
    
  const [topBookmarks, setTopBookmarks] = useState<any[]>([])
  const [topVisitedSites, setTopVisitedSites] = useState<any[]>([])

  // load latest 5 bookmarks when popup mounts
  useEffect(() => {
    if (chrome?.bookmarks?.getRecent) {
      chrome.bookmarks.getRecent(100, (bookmarks) => {
      const domainUrl = 'smacerp.com' // Replace with your desired domain
      const filtered = bookmarks
        .filter((b) => b.url && new URL(b.url).hostname.includes(domainUrl))
        .slice(0, 5)
        console.log('Recent bookmarks from chrome API:', filtered);
    //   setRecentBookmarks(filtered)
        setTopBookmarks(filtered)
      })
    }   

    if (chrome?.topSites?.get) {
      chrome.topSites.get((sites) => {
        // const domainUrl = 'smacerp.com' // Replace with your desired domain
        const filtered = sites
            // .filter((s) => s.url && new URL(s.url).hostname.includes(domainUrl))
            .slice(0, 5)
        console.log('Top visited sites from chrome API:', filtered);
        setTopVisitedSites(filtered)
      })
    }
  }, [])
  return <section>
        <h2>Recent bookmarks</h2>
        {topBookmarks?.length === 0 ? (
          <p>No bookmarks found.</p>
        ) : (
          <ul>
            {topBookmarks?.map((b:any) => (
              <li key={b.id}>
                {b.url ? (
                  <a href={b.url} target="_blank" rel="noreferrer">
                    {b.title || b.url}
                  </a>
                ) : (
                  <span>{b.title || '(no url)'}</span>
                )}
              </li>
            ))}
          </ul>
        )}
        <h2>Top visited sites</h2>
        {topVisitedSites?.length === 0 ? (
          <p>No top sites found.</p>
        ) : (
          <ul>
            {topVisitedSites?.map((s:any) => (
                <li key={s.url}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.title || s.url}
                    </a>
                ) : (
                  <span>{s.title || '(no url)'}</span>
                )}
                </li>
            ))}
          </ul>
        )}
      </section>
}

export default BookmarksList