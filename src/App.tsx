import { useState, useEffect } from 'react'

type Section = 'history' | 'culture' | 'politics' | 'language' | 'cities' | 'photography' | 'flashcards'

interface Phrase {
  tajikCyrillic: string
  transliteration: string
  farsi: string
  english: string
}

interface NavSection {
  id: Section
  label: string
  icon: (props: { className: string }) => JSX.Element
}

// Minimal monochrome text icons
function HistoryIcon({ className }: { className: string }) {
  return <span className={className}>◯</span>
}

function CultureIcon({ className }: { className: string }) {
  return <span className={className}>◉</span>
}

function PoliticsIcon({ className }: { className: string }) {
  return <span className={className}>⬚</span>
}

function LanguageIcon({ className }: { className: string }) {
  return <span className={className}>≡</span>
}

function CitiesIcon({ className }: { className: string }) {
  return <span className={className}>▢▢</span>
}

function PhotographyIcon({ className }: { className: string }) {
  return <span className={className}>□</span>
}

function FlashcardsIcon({ className }: { className: string }) {
  return <span className={className}>▭▭</span>
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('history')
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      return stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const sections: NavSection[] = [
    { id: 'history', label: 'History', icon: HistoryIcon },
    { id: 'culture', label: 'Culture', icon: CultureIcon },
    { id: 'politics', label: 'Politics', icon: PoliticsIcon },
    { id: 'language', label: 'Language', icon: LanguageIcon },
    { id: 'cities', label: 'Cities', icon: CitiesIcon },
    { id: 'photography', label: 'Photography', icon: PhotographyIcon },
    { id: 'flashcards', label: 'Flashcards', icon: FlashcardsIcon },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors flex flex-col">
      {/* Header */}
      <header className="border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-6xl font-light text-stone-900 dark:text-stone-50 mb-2 sm:mb-3">Tajikistan</h1>
            <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-400 font-light leading-relaxed">A learning journey through history, culture, and language</p>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="mt-2 px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all duration-200 text-sm font-medium border border-stone-200 dark:border-stone-800 flex-shrink-0 focus:outline-2 focus:outline-offset-2 focus:outline-stone-900 dark:focus:outline-stone-100"
            title={isDark ? 'Light mode' : 'Dark mode'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? '◐' : '◑'}
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Navigation Header */}
        <nav className="sm:hidden fixed top-0 left-0 right-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 z-20 flex items-center h-16 px-4">
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-stone-900 dark:focus:outline-stone-100"
            title="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="drawer-nav"
            aria-label="Toggle navigation menu"
          >
            {drawerOpen ? '✕' : '☰'}
          </button>
          <div className="flex-1 text-center">
            <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
              {sections.find(s => s.id === activeSection)?.label}
            </span>
          </div>
          <div className="w-10" />
        </nav>

        {/* Mobile Drawer */}
        {drawerOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 overflow-y-auto z-40 sm:hidden" id="drawer-nav">
              <div className="p-4 space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id)
                        setDrawerOpen(false)
                      }}
                      aria-current={activeSection === section.id ? 'page' : undefined}
                      className={`w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm font-medium focus:outline-2 focus:outline-offset-2 focus:outline-stone-900 dark:focus:outline-stone-100 ${
                        activeSection === section.id
                          ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {section.label}
                    </button>
                  )
                })}
              </div>
            </aside>
          </>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex-shrink-0 overflow-y-auto">
          <div className="p-6 space-y-1 sticky top-0">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 text-sm font-medium focus:outline-2 focus:outline-offset-2 focus:outline-stone-900 dark:focus:outline-stone-100 ${
                    activeSection === section.id
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {section.label}
                </button>
              )
            })}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pt-16 sm:pt-0 px-4 sm:px-8 py-8 sm:py-16 landscape:py-2 landscape:px-2 text-base">
          <div className="max-w-3xl landscape:max-w-full">
            {activeSection === 'history' && <HistorySection />}
            {activeSection === 'culture' && <CultureSection />}
            {activeSection === 'politics' && <PoliticsSection />}
            {activeSection === 'language' && <LanguageSection />}
            {activeSection === 'cities' && <CitiesSection />}
            {activeSection === 'photography' && <PhotographySection />}
            {activeSection === 'flashcards' && <FlashcardsSection />}
          </div>
        </main>
      </div>
    </div>
  )
}

function HistorySection() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-light text-stone-900 mb-10">History of Tajikistan</h2>

      <ContentCard title="Ancient & Medieval Periods">
        <p>
          Tajikistan's history spans millennia, with roots in the Persian empires of antiquity. The region was part of the Achaemenid Empire under Cyrus the Great, then conquered by Alexander the Great in the 4th century BC.
        </p>
        <FarsiCallout word="Achaemenid" farsi="هخامنشی" note="Same root: ancient Persian dynasty" />
        <p className="mt-4">
          Under Islamic rule from the 7th century, Tajikistan became a center of Persian culture and learning, particularly during the Samanid Empire (9th-10th centuries), which saw a flourishing of science, literature, and philosophy. The region produced great scholars like Al-Bukhari and Al-Ghazali.
        </p>
      </ContentCard>

      <ContentCard title="Mongol & Timurid Eras">
        <p>
          The Mongol invasions of the 13th century devastated Central Asia, but the subsequent Timurid Renaissance (14th-15th centuries) brought cultural revival. Timur and his descendants patronized the arts, architecture, and sciences. Cities like Samarkand and Bukhara became centers of learning.
        </p>
      </ContentCard>

      <ContentCard title="Russian Empire & Soviet Period">
        <p>
          In the 19th century, Tajikistan came under Russian imperial control through the "Great Game" competition with Britain. The region was formally incorporated into the Russian Empire, then became part of the Soviet Union in 1924.
        </p>
        <FarsiCallout word="Soviet" farsi="شوروی" note="Soviet Union: USSR (اتحاد شوروی سوسیالیستی)" />
        <p className="mt-4">
          Soviet rule brought industrialization, education, and forced collectivization. The period saw significant infrastructure development but also cultural suppression and political repression. Tajik identity was carefully managed within the Soviet multinational state.
        </p>
      </ContentCard>

      <ContentCard title="Independence & Modern Era (1991-Present)">
        <p>
          Tajikistan declared independence on September 9, 1991, following the collapse of the Soviet Union. This was quickly followed by a devastating civil war (1992-1997) between government forces and various opposition groups, causing 50,000+ deaths and displacing hundreds of thousands.
        </p>
        <p className="mt-4">
          Since the 1997 peace accord, Tajikistan has worked toward stability and development. The government has focused on nation-building, though challenges remain including economic development, regional tensions, and political freedoms.
        </p>
      </ContentCard>

      <ContentCard title="Tajikistan & Iran: A Shared Heritage, Separate Nations">
        <p>
          Tajikistan and Iran share a profound cultural and linguistic heritage, both rooted in Persian civilization. However, they became separate political entities through colonial history rather than an active "separation."
        </p>
        <p className="mt-4">
          <strong>The Historical Division:</strong> During the 19th century "Great Game" between the Russian and British empires, the region was divided:
        </p>
        <ul className="mt-3 space-y-2 ml-4">
          <li><strong>1868-1900s:</strong> Russia expanded southward, conquering Central Asian territories and establishing the Turkestan Governor-Generalship</li>
          <li><strong>1881 & 1895:</strong> Russia and Persia (Iran) signed treaties defining their borders. The Amu Darya River became the northern boundary of Persia</li>
          <li><strong>1924:</strong> The Soviet Union created the Tajik ASSR (Autonomous Soviet Socialist Republic), formally separating Tajik-speaking territories from Iran</li>
          <li><strong>1929:</strong> Tajik ASSR upgraded to a full SSR (Soviet Socialist Republic)</li>
        </ul>
        <p className="mt-4">
          Today, Tajikistan and Iran remain separate nations, though cultural ties remain strong. Both celebrate Nowruz (Persian New Year), speak related languages, and share literary and artistic traditions. The border between them is defined by international treaties, and relations are generally cordial, with trade and cultural exchanges.
        </p>
      </ContentCard>

      <ContentCard title="Historical Timeline">
        <div className="space-y-4 mt-4">
          <div className="border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-2">
            <p className="font-semibold text-stone-900 dark:text-stone-50">3000 BC - 7th Century AD</p>
            <p className="text-sm text-stone-600 dark:text-stone-400">Ancient period: Achaemenid Empire (550-330 BC), Alexander the Great (330 BC), Parthian & Sassanid Empires</p>
          </div>
          <div className="border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-2">
            <p className="font-semibold text-stone-900 dark:text-stone-50">7th - 13th Century</p>
            <p className="text-sm text-stone-600 dark:text-stone-400">Islamic Golden Age: Samanid Empire (9th-10th century) — peak of Persian-Tajik civilization, center of science & arts</p>
          </div>
          <div className="border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-2">
            <p className="font-semibold text-stone-900 dark:text-stone-50">13th - 15th Century</p>
            <p className="text-sm text-stone-600 dark:text-stone-400">Mongol invasions (13th century), Timurid Renaissance (14th-15th century) with cultural flowering</p>
          </div>
          <div className="border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-2">
            <p className="font-semibold text-stone-900 dark:text-stone-50">1868 - 1895</p>
            <p className="text-sm text-stone-600 dark:text-stone-400">Russian expansion: Russia conquers Central Asian territories; border treaties with Persia define Amu Darya as boundary</p>
          </div>
          <div className="border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-2">
            <p className="font-semibold text-stone-900 dark:text-stone-50">1924 - 1929</p>
            <p className="text-sm text-stone-600 dark:text-stone-400">Soviet period: Creation of Tajik ASSR (1924), elevated to Tajik SSR (1929); Cyrillic script replaces Persian script</p>
          </div>
          <div className="border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-2">
            <p className="font-semibold text-stone-900 dark:text-stone-50">1991 - 1997</p>
            <p className="text-sm text-stone-600 dark:text-stone-400">Independence (Sept 9, 1991): Dissolution of Soviet Union; Tajik Civil War (1992-1997)</p>
          </div>
          <div className="border-l-2 border-stone-300 dark:border-stone-700 pl-4 py-2">
            <p className="font-semibold text-stone-900 dark:text-stone-50">1997 - Present</p>
            <p className="text-sm text-stone-600 dark:text-stone-400">Peace & nation-building: Post-war reconstruction; development; maintenance of cultural ties with Iran and broader Persian world</p>
          </div>
        </div>
      </ContentCard>
    </div>
  )
}

function CultureSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-light text-stone-900 mb-10">Culture & Traditions</h2>

      <ContentCard title="Language & Identity">
        <p>
          Tajik is the official language, an Indo-European language closely related to Persian/Farsi. Native speakers: ~6 million. Tajik uses the Cyrillic script (a legacy of Soviet rule), unlike Farsi which uses the Persian script.
        </p>
        <FarsiCallout word="Tajik" farsi="تاجیک" note="Same Persian root as 'Taaj' (crown) – ancient designation" />
        <p className="mt-4">
          Many Tajiks are multilingual, speaking Russian (from Soviet education) and increasingly English. Tajik ethnic identity is deeply tied to Persian cultural heritage—literature, poetry, and the historical role in the Islamic Golden Age.
        </p>
      </ContentCard>

      <ContentCard title="Cuisine">
        <p>
          Tajik cuisine reflects its position on the Silk Road, blending Persian, Central Asian, and Russian influences.
        </p>
        <ul className="mt-4 space-y-3 ml-4">
          <li><strong>Plov</strong> – rice pilaf with meat and spices (Persian: پلو)</li>
          <li><strong>Quroot</strong> – dried yogurt balls (Persian: قروت)</li>
          <li><strong>Shurbo</strong> – hearty meat soup</li>
          <li><strong>Samsa</strong> – meat pastries (Persian: سمسه)</li>
          <li><strong>Lepinja</strong> – traditional flatbread</li>
        </ul>
        <p className="mt-4">Hospitality is central to Tajik culture—tea (чой) is served throughout the day, and guests are treated with great respect.</p>
      </ContentCard>

      <ContentCard title="Music & Dance">
        <p>
          Traditional Tajik music features instruments like the rubab (a stringed instrument), dombra, and frame drums. Sufi music remains important in spiritual practices. The ghichak (stringed fiddle) is iconic.
        </p>
        <FarsiCallout word="Rubab" farsi="روباب" note="Same instrument across Persian-speaking cultures" />
        <p className="mt-4">
          Dance is integral to celebrations, particularly the energetic dutor (two-string lute) dances performed at festivals.
        </p>
      </ContentCard>

      <ContentCard title="Textiles & Crafts">
        <p>
          Tajikistan is renowned for its suzani embroidery—colorful hand-stitched fabrics with geometric and floral patterns, sold across Central Asia. Traditional carpet weaving and silk production are also important crafts.
        </p>
        <FarsiCallout word="Suzani" farsi="سوزن‌ای" note="From 'sewing needle' - سوزن" />
      </ContentCard>

      <ContentCard title="Holidays & Celebrations">
        <ul className="space-y-3">
          <li><strong>Nowruz</strong> (Persian New Year, March 20-21) – Spring celebration marking rebirth and renewal</li>
          <li><strong>Eid al-Fitr & Eid al-Adha</strong> – Islamic holidays celebrated with family gatherings</li>
          <li><strong>Independence Day</strong> (September 9) – National celebration</li>
          <li><strong>Founder's Day</strong> (November 6) – Honoring national founder Emomali Rahmon</li>
        </ul>
      </ContentCard>
    </div>
  )
}

function PoliticsSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-light text-stone-900 mb-10">Politics & Government</h2>

      <ContentCard title="System of Government">
        <p>
          Tajikistan is a presidential republic with a bicameral legislature (National Assembly). The President serves as head of state and government. The current president, Emomali Rahmon, has led the country since 1992.
        </p>
        <p className="mt-4">
          The system is often described as authoritarian, with significant executive power concentrated in the presidency. The government has faced criticism for limited press freedom and restrictions on opposition parties.
        </p>
      </ContentCard>

      <ContentCard title="Post-Civil War Reconciliation (1997-Present)">
        <p>
          The 1997 General Agreement on the Establishment of Peace and National Accord ended the civil war. This agreement integrated opposition forces into the government and established a framework for multi-party politics, though implementation has been gradual and contested.
        </p>
      </ContentCard>

      <ContentCard title="Key Political Issues">
        <ul className="space-y-3 ml-4">
          <li><strong>Regional conflicts:</strong> Border disputes with Kyrgyzstan over undefined borders (legacy of Soviet era)</li>
          <li><strong>Economic development:</strong> Poverty remains high (~25% of population); agriculture dominates</li>
          <li><strong>Energy security:</strong> Hydropower potential is central to economic strategy</li>
          <li><strong>Regional influence:</strong> Balancing relations with Russia, China, and the West</li>
          <li><strong>Migration:</strong> Large diaspora (2+ million Tajiks abroad) remit significant income</li>
        </ul>
      </ContentCard>

      <ContentCard title="International Relations">
        <p>
          Tajikistan maintains close ties with Russia (CSTO member, Russian military base in Khujand). It has growing economic partnerships with China, particularly around Belt and Road initiatives. Relations with Iran remain warm due to cultural and linguistic ties.
        </p>
      </ContentCard>
    </div>
  )
}

function LanguageSection() {
  const greetings: Phrase[] = [
    { tajikCyrillic: 'Ассалому алайкум', transliteration: 'Assalomu alaikum', farsi: 'السلام علیکم', english: 'Peace be upon you' },
    { tajikCyrillic: 'Лабас', transliteration: 'Labas', farsi: 'سلام', english: 'Hello (informal)' },
    { tajikCyrillic: 'Хуш омадӣ', transliteration: 'Khush omadi', farsi: 'خوش آمدید', english: 'Welcome' },
  ]

  const courtesy: Phrase[] = [
    { tajikCyrillic: 'Мехмон', transliteration: 'Mehmoni', farsi: 'مهمان', english: 'Guest' },
    { tajikCyrillic: 'Рахмат', transliteration: 'Rahmat', farsi: 'رحمت', english: 'Thank you' },
    { tajikCyrillic: 'Илхос', transliteration: 'Ilhos', farsi: 'بخشش', english: 'Excuse me' },
    { tajikCyrillic: 'Бале', transliteration: 'Bale', farsi: 'بله', english: 'Yes' },
    { tajikCyrillic: 'Не', transliteration: 'Neh', farsi: 'نه', english: 'No' },
  ]

  const words: Phrase[] = [
    { tajikCyrillic: 'Об', transliteration: 'Ov', farsi: 'آب', english: 'Water' },
    { tajikCyrillic: 'Нон', transliteration: 'Non', farsi: 'نان', english: 'Bread' },
    { tajikCyrillic: 'Хонавода', transliteration: 'Khonadon', farsi: 'خانواده', english: 'Family' },
    { tajikCyrillic: 'Дост', transliteration: 'Dost', farsi: 'دوست', english: 'Friend' },
    { tajikCyrillic: 'Мухаббат', transliteration: 'Muhabbat', farsi: 'محبت', english: 'Love' },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-light text-stone-900 mb-10">Language & Expressions</h2>

      <ContentCard title="Tajik Language Overview">
        <p>
          Tajik is a Persian language (nearly identical to Dari, spoken in Afghanistan). It's an Indo-European language with Arabic loanwords due to Islamization. <strong>In Tajikistan, it's written in Cyrillic script</strong> (unlike Iran's Persian, which uses the Persian script)—much like Serbian!
        </p>
        <FarsiCallout word="Tajik" farsi="تاجیکی" note="Mutually intelligible with Farsi; minor vocabulary differences" />
        <p className="mt-4 text-sm text-stone-600">
          <strong>Cyrillic Guide:</strong> If you know Serbian Cyrillic, you'll recognize many letters. The main differences are a few additional letters (Ғ, Ӣ, Ӯ, Ҳ) used in Tajik for Persian sounds.
        </p>
      </ContentCard>

      <ContentCard title="Common Phrases & Cognates">
        <div className="space-y-6">
          <div>
            <p className="font-medium text-stone-900 mb-3">Greetings 📖</p>
            <div className="space-y-2 text-sm">
              {greetings.map((phrase, i) => (
                <PhraseRow key={i} phrase={phrase} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium text-stone-900 mb-3">Courtesy Expressions 🤝</p>
            <div className="space-y-2 text-sm">
              {courtesy.map((phrase, i) => (
                <PhraseRow key={i} phrase={phrase} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium text-stone-900 mb-3">Common Words 💬</p>
            <div className="space-y-2 text-sm">
              {words.map((phrase, i) => (
                <PhraseRow key={i} phrase={phrase} />
              ))}
            </div>
          </div>
        </div>
      </ContentCard>

      <ContentCard title="Cyrillic Script Note">
        <p className="mb-3">
          Here are some key Cyrillic letters in Tajik that you'll encounter:
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm mt-4">
          <div><strong>Ғ</strong> – ghayn (غ) – a guttural sound</div>
          <div><strong>Ӣ</strong> – long "ee" (ی)</div>
          <div><strong>Ӯ</strong> – long "oo" (و)</div>
          <div><strong>Ҳ</strong> – "h" sound (ح)</div>
          <div><strong>Ҷ</strong> – "ch" sound (چ)</div>
          <div><strong>Ӣ</strong> – long "i" (ی)</div>
        </div>
      </ContentCard>

      <ContentCard title="Cultural Language Notes">
        <p>
          Tajik culture places great value on respect and formal address. Older people are addressed with honorifics. Poetry is deeply embedded in Tajik culture—Rudaki and Omar Khayyam are celebrated poets whose works are still widely read.
        </p>
        <FarsiCallout word="Шоир (Shoir)" farsi="شاعر" note="Poet – central to Persian/Tajik literary tradition" />
        <p className="mt-4">
          The phrase <strong>Дуо кунам</strong> (Дуо кунам) – "I pray/wish for you" – is commonly used to express good intentions toward others.
        </p>
      </ContentCard>

      <ContentCard title="Proverbs & Wisdom">
        <ul className="space-y-3 text-sm">
          <li><strong>Дили рома рома</strong> – A happy heart makes happy days</li>
          <li><strong>Чун болавҷ, душвор</strong> – Life is difficult, but perseverance brings reward</li>
          <li><strong>Орифе дарнаме, охири дарнаме</strong> – Knowledge is the beginning and end</li>
        </ul>
      </ContentCard>
    </div>
  )
}

function CitiesSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-light text-stone-900 mb-10">Three Cities</h2>

      <ContentCard title="Dushanbe (Capital)">
        <p className="font-medium text-stone-700 mb-3">Population: ~850,000 | Elevation: 800m</p>
        <p>
          Dushanbe, meaning "Monday" in Tajik (from the market held on Mondays), is the capital and largest city. Modern Dushanbe was founded in 1924 during the Soviet era and developed as an industrial and administrative center.
        </p>
        <FarsiCallout word="Dushanbe" farsi="دوشنبه" note="Exactly the same word for 'Monday' in Farsi" />
        <p className="mt-4">
          <strong>Key Features:</strong> The city blends Soviet-era architecture with modern developments. Notable sites include the Palace of Nations, Rudaki Park, and the National Museum of Tajikistan. The Dushanbe Flag (tallest flagpole in the world at 165m) is a symbol of national pride.
        </p>
        <p className="mt-4">
          <strong>Culture & Life:</strong> Dushanbe is the intellectual and cultural heart—home to universities, museums, galleries, and the National Opera House. The city hosts the annual Dushanbe Tea Festival and various cultural events.
        </p>
      </ContentCard>

      <ContentCard title="Khujand (Second City)">
        <p className="font-medium text-stone-700 mb-3">Population: ~190,000 | In Sughd Province, Northern Tajikistan</p>
        <p>
          One of Central Asia's oldest cities (founded ~500 BC), Khujand sits on the Syr Darya river and was a major stop on the Silk Road. It was historically known as Khorezm and later as Leninabad during the Soviet era.
        </p>
        <p className="mt-4">
          <strong>Historical Significance:</strong> Khujand was famous for scholarship, trade, and craftsmanship. It resisted Alexander the Great's conquest with remarkable heroism. The city's fortress walls (partially restored) date back centuries.
        </p>
        <p className="mt-4">
          <strong>Modern Khujand:</strong> The city retains more traditional Central Asian character than Dushanbe. The Friday Bazaar is famous for vibrant markets. Agriculture (cotton, fruit) and light industry drive the economy.
        </p>
      </ContentCard>

      <ContentCard title="Khorog (Gateway to Pamir)">
        <p className="font-medium text-stone-700 mb-3">Population: ~35,000 | In Badakhshan Province (GBAO), Southern Tajikistan</p>
        <p>
          Khorog sits at the junction of the Panj and Amu rivers, marking the border with Afghanistan. It's the major city in the Pamir region and serves as a gateway to adventure tourism—trekking, mountaineering, and natural beauty.
        </p>
        <p className="mt-4">
          <strong>Geography & Climate:</strong> High altitude (~2,100m), surrounded by dramatic mountain scenery. The Hindu Kush and Pamir ranges make it one of the world's most remote and pristine environments. Weather is cool even in summer.
        </p>
        <p className="mt-4">
          <strong>Character:</strong> Khorog has a frontier feel—less developed, more authentic. The Panj Valley offers some of Central Asia's most stunning landscapes. Local markets reflect Afghan and Pamir mountain culture. The Botanical Garden is a notable feature.
        </p>
      </ContentCard>

      <ContentCard title="Comparing the Three Cities">
        <table className="w-full mt-4 text-sm">
          <thead>
            <tr className="border-b border-stone-200">
              <th className="text-left py-2 font-medium">Aspect</th>
              <th className="text-left py-2 font-medium">Dushanbe</th>
              <th className="text-left py-2 font-medium">Khujand</th>
              <th className="text-left py-2 font-medium">Khorog</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            <tr className="border-b border-stone-100">
              <td className="py-2">Type</td>
              <td>Modern capital</td>
              <td>Historic Silk Road city</td>
              <td>Mountain gateway</td>
            </tr>
            <tr className="border-b border-stone-100">
              <td className="py-2">Best for</td>
              <td>Culture, museums, nightlife</td>
              <td>History, bazaars, tradition</td>
              <td>Trekking, nature, adventure</td>
            </tr>
            <tr className="border-b border-stone-100">
              <td className="py-2">Climate</td>
              <td>Warm summers, mild winters</td>
              <td>Continental, moderate</td>
              <td>Cool, mountain climate</td>
            </tr>
            <tr>
              <td className="py-2">Vibe</td>
              <td>Cosmopolitan, busy</td>
              <td>Traditional, authentic</td>
              <td>Remote, frontier</td>
            </tr>
          </tbody>
        </table>
      </ContentCard>
    </div>
  )
}

function PhotographySection() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-light text-stone-900 mb-10">Photography & Your Workshop</h2>

      <ContentCard title="Photographic Opportunities">
        <p>
          Tajikistan offers extraordinary visual diversity—from bustling bazaars to pristine mountain landscapes.
        </p>
        <ul className="mt-4 space-y-3 ml-4">
          <li><strong>Dushanbe:</strong> Urban architecture (Soviet and modern), street life, cultural events, museums</li>
          <li><strong>Khujand:</strong> Historic Silk Road architecture, bazaars, river scenes, ancient fortifications</li>
          <li><strong>Pamir/Khorog:</strong> Mountain landscapes, alpine vistas, remote villages, the Panj Valley, dramatic light</li>
          <li><strong>Seasonal:</strong> September offers warm but cooling temperatures, golden light, clear mountain views</li>
        </ul>
      </ContentCard>

      <ContentCard title="Cultural Photography Considerations">
        <p>
          Tajik hospitality is warm, but always ask permission before photographing people. Respect for privacy and dignity is important. In rural areas, some elders may be more reserved about photography.
        </p>
        <p className="mt-4">
          Photography in restricted border areas (near Afghanistan, especially in Badakhshan) may have sensitivities. Avoid photographing military installations or government buildings without permission.
        </p>
      </ContentCard>

      <ContentCard title="Your Workshop Preparation">
        <p>
          Before arriving, consider what aspects of Tajikistan resonate with you:
        </p>
        <ul className="mt-4 space-y-2 ml-4">
          <li>• Study the history of the cities you'll visit—context enriches visual storytelling</li>
          <li>• Learn basic Tajik phrases to build rapport with subjects</li>
          <li>• Understand cultural traditions and festivals happening in September</li>
          <li>• Research the geography of each region—light, seasons, and weather patterns</li>
          <li>• Prepare for altitude (Khorog and higher elevations) if trekking</li>
        </ul>
      </ContentCard>

      <ContentCard title="Post-Workshop: Storytelling">
        <p>
          Your photographs will gain depth when paired with knowledge of Tajik history, culture, and language. Consider how your images tell stories about:
        </p>
        <ul className="mt-4 space-y-2 ml-4">
          <li>• Daily life and traditions (how history shapes present culture)</li>
          <li>• The Silk Road legacy visible in architecture and trade</li>
          <li>• Mountain-human relationships (resilience, adaptation)</li>
          <li>• Generational changes and modernization</li>
        </ul>
      </ContentCard>
    </div>
  )
}

interface Flashcard {
  front: string
  back: string
  category: string
}

function FlashcardsSection() {
  const [currentSet, setCurrentSet] = useState<'language' | 'cities' | 'history'>('language')
  const [cardIndex, setCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCardIndex((prev) => (prev + 1) % flashcardSets[currentSet].length)
        setIsFlipped(false)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCardIndex((prev) => (prev - 1 + flashcardSets[currentSet].length) % flashcardSets[currentSet].length)
        setIsFlipped(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSet])

  const flashcardSets: Record<'language' | 'cities' | 'history', Flashcard[]> = {
    language: [
      { front: 'Ассалому алайкум', back: 'Peace be upon you', category: 'Greeting' },
      { front: 'Лабас', back: 'Hello (informal)', category: 'Greeting' },
      { front: 'Рахмат', back: 'Thank you', category: 'Courtesy' },
      { front: 'Об', back: 'Water', category: 'Word' },
      { front: 'Нон', back: 'Bread', category: 'Word' },
      { front: 'Дост', back: 'Friend', category: 'Word' },
      { front: 'Мухаббат', back: 'Love', category: 'Word' },
      { front: 'Хонавода', back: 'Family', category: 'Word' },
      { front: 'Бале', back: 'Yes', category: 'Response' },
      { front: 'Не', back: 'No', category: 'Response' },
    ],
    cities: [
      { front: 'Dushanbe', back: 'Capital, 850k people, meaning "Monday"', category: 'City' },
      { front: 'Khujand', back: '190k people, historic Silk Road city, 500 BC', category: 'City' },
      { front: 'Khorog', back: '35k people, Pamir gateway, mountain city', category: 'City' },
      { front: 'Bokhtar', back: '63k people, Khatlon province, agricultural region', category: 'City' },
      { front: 'Kulob', back: '93k people, Khatlon province, historical cultural center', category: 'City' },
      { front: 'What river borders Tajikistan?', back: 'Amu Darya', category: 'Geography' },
      { front: 'Highest mountain in Tajikistan?', back: 'Peak Ismail Samani (7,495m)', category: 'Geography' },
      { front: 'Panj Valley location?', back: 'Southern Tajikistan, Khorog area, Afghanistan border', category: 'Geography' },
    ],
    history: [
      { front: 'When did Tajikistan gain independence?', back: 'September 9, 1991', category: 'Modern History' },
      { front: 'Who conquered Tajikistan in 4th century BC?', back: 'Alexander the Great', category: 'Ancient History' },
      { front: 'Samanid Empire dates?', back: '9th-10th centuries, Persian golden age', category: 'Medieval History' },
      { front: 'Civil war period?', back: '1992-1997', category: 'Modern History' },
      { front: 'Current president (as of 2024)?', back: 'Emomali Rahmon (since 1992)', category: 'Modern History' },
      { front: 'Silk Road importance?', back: 'Trade route connecting East & West through Central Asia', category: 'Historical Trade' },
    ],
  }

  const cards = flashcardSets[currentSet]
  const card = cards[cardIndex]

  const nextCard = () => {
    setCardIndex((prev) => (prev + 1) % cards.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCardIndex((prev) => (prev - 1 + cards.length) % cards.length)
    setIsFlipped(false)
  }

  const shuffle = () => {
    setCardIndex(Math.floor(Math.random() * cards.length))
    setIsFlipped(false)
  }

  const getCacheKey = (text: string) => `audio_cache_${text}`

  const getAudioFromCache = (text: string): string | null => {
    try {
      const cached = localStorage.getItem(getCacheKey(text))
      return cached
    } catch {
      return null
    }
  }

  const saveAudioToCache = (text: string, dataUrl: string) => {
    try {
      localStorage.setItem(getCacheKey(text), dataUrl)
    } catch (error) {
      console.warn('Failed to cache audio:', error)
    }
  }

  const playFlashcardAudio = async (text: string) => {
    setIsPlayingAudio(true)
    try {
      // Check cache first
      const cachedAudio = getAudioFromCache(text)
      if (cachedAudio) {
        const audio = new Audio(cachedAudio)
        audio.play()
        setIsPlayingAudio(false)
        return
      }

      // If not cached, fetch from API
      const apiKey = import.meta.env.VITE_OPENAI_KEY
      if (!apiKey) {
        console.log('No OpenAI key configured. Audio unavailable.')
        setIsPlayingAudio(false)
        return
      }

      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: text,
          voice: 'onyx',
        }),
      })

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer()
        const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' })
        const reader = new FileReader()
        reader.onload = () => {
          const dataUrl = reader.result as string
          saveAudioToCache(text, dataUrl)
          const audio = new Audio(dataUrl)
          audio.play()
          setIsPlayingAudio(false)
        }
        reader.readAsDataURL(blob)
      }
    } catch (error) {
      console.error('Audio playback failed:', error)
      setIsPlayingAudio(false)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-light text-stone-900 dark:text-stone-50 mb-10 flashcard-title">Flashcards</h2>

      {/* Set Selector */}
      <div className="flex gap-3 flex-wrap flashcard-set-selector">
        {(['language', 'cities', 'history'] as const).map((set) => (
          <button
            key={set}
            onClick={() => {
              setCurrentSet(set)
              setCardIndex(0)
              setIsFlipped(false)
            }}
            className={`px-4 sm:px-6 py-2 rounded-lg border-2 transition-all font-medium ${
              currentSet === set
                ? 'border-stone-900 dark:border-stone-50 bg-stone-900 dark:bg-stone-50 text-white dark:text-stone-900'
                : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-500 dark:hover:border-stone-500'
            }`}
          >
            {set.charAt(0).toUpperCase() + set.slice(1)}
          </button>
        ))}
      </div>

      {/* Flashcard */}
      <div className="flex flex-col items-center gap-4 sm:gap-8 w-full flashcard-container">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full max-w-2xl h-56 sm:h-80 cursor-pointer perspective touch-none"
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 ${
              isFlipped ? 'scale-x-[-1]' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front */}
            <div
              className="absolute w-full h-full bg-white dark:bg-stone-900 border-2 border-stone-300 dark:border-stone-700 rounded-lg p-4 sm:p-8 flex flex-col items-center justify-center text-center gap-3 sm:gap-4"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-3 sm:mb-4">Tap to reveal</p>
                <p className="text-2xl sm:text-4xl font-light text-stone-900 dark:text-stone-50 break-words">{card.front}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  playFlashcardAudio(card.front)
                }}
                disabled={isPlayingAudio}
                aria-label={`Pronounce: ${card.front}`}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 disabled:bg-stone-300 dark:disabled:bg-stone-700 rounded transition-colors text-base sm:text-lg min-h-10 min-w-10 focus:outline-2 focus:outline-offset-2 focus:outline-stone-900 dark:focus:outline-stone-100"
                title="Pronounce this word"
              >
                {isPlayingAudio ? '◼' : '♪'}
              </button>
            </div>

            {/* Back */}
            <div
              className="absolute w-full h-full bg-stone-100 dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-700 rounded-lg p-4 sm:p-8 flex flex-col items-center justify-center text-center gap-3 sm:gap-4"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-2">{card.category}</p>
                <p className="text-xl sm:text-3xl font-light text-stone-900 dark:text-stone-50 break-words">{card.back}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  playFlashcardAudio(card.front)
                }}
                disabled={isPlayingAudio}
                aria-label={`Pronounce Tajik: ${card.front}`}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-600 disabled:bg-stone-400 dark:disabled:bg-stone-600 rounded transition-colors text-base sm:text-lg min-h-10 min-w-10 focus:outline-2 focus:outline-offset-2 focus:outline-stone-900 dark:focus:outline-stone-100"
                title="Pronounce the Tajik word"
              >
                {isPlayingAudio ? '◼' : '♪'}
              </button>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="text-center flashcard-progress">
          <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 font-medium">
            {cardIndex + 1} / {cards.length}
          </p>
        </div>

        {/* Controls - Optimized for mobile */}
        <div className="flex gap-3 sm:gap-4 flex-wrap justify-center w-full px-2 flashcard-controls">
          <button
            onClick={prevCard}
            aria-label={`Previous card (${cardIndex} of ${cards.length})`}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 active:bg-stone-300 dark:active:bg-stone-700 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base min-h-11 border border-stone-200 dark:border-stone-800 focus:outline-2 focus:outline-offset-2 focus:outline-stone-900 dark:focus:outline-stone-100"
          >
            ← Prev
          </button>
          <button
            onClick={shuffle}
            aria-label="Shuffle cards"
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 active:bg-black dark:active:bg-stone-300 text-white dark:text-stone-900 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base min-h-11 shadow-md hover:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-stone-900 dark:focus:outline-stone-100"
          >
            ⇌ Shuffle
          </button>
          <button
            onClick={nextCard}
            aria-label={`Next card (${cardIndex + 2} of ${cards.length})`}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 active:bg-stone-300 dark:active:bg-stone-700 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base min-h-11 border border-stone-200 dark:border-stone-800 focus:outline-2 focus:outline-offset-2 focus:outline-stone-900 dark:focus:outline-stone-100"
          >
            Next →
          </button>
        </div>

        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 text-center px-2 flashcard-hint">Use arrow keys or tap to navigate • Click card to flip</p>
      </div>
    </div>
  )
}

// Components
function PhraseRow({ phrase }: { phrase: Phrase }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const getCacheKey = (text: string) => `audio_cache_${text}`

  const getAudioFromCache = (text: string): string | null => {
    try {
      const cached = localStorage.getItem(getCacheKey(text))
      return cached
    } catch {
      return null
    }
  }

  const saveAudioToCache = (text: string, dataUrl: string) => {
    try {
      localStorage.setItem(getCacheKey(text), dataUrl)
    } catch (error) {
      console.warn('Failed to cache audio:', error)
    }
  }

  const playAudio = async () => {
    if (!phrase.transliteration) return
    setIsPlaying(true)
    try {
      const cacheKey = phrase.transliteration

      // Check cache first
      const cachedAudio = getAudioFromCache(cacheKey)
      if (cachedAudio) {
        const audio = new Audio(cachedAudio)
        audio.play()
        setIsPlaying(false)
        return
      }

      // If not cached, fetch from API
      const apiKey = import.meta.env.VITE_OPENAI_KEY
      if (!apiKey) {
        console.log('No OpenAI key configured. Audio unavailable.')
        setIsPlaying(false)
        return
      }

      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          input: phrase.transliteration,
          voice: 'onyx',
        }),
      })

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer()
        const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' })
        const url = URL.createObjectURL(blob)

        // Convert to data URL for caching
        const reader = new FileReader()
        reader.onload = () => {
          const dataUrl = reader.result as string
          saveAudioToCache(cacheKey, dataUrl)
          const audio = new Audio(dataUrl)
          audio.play()
          setIsPlaying(false)
        }
        reader.readAsDataURL(blob)
      }
    } catch (error) {
      console.error('Audio playback failed:', error)
      setIsPlaying(false)
    }
  }

  return (
    <div className="flex items-start justify-between bg-stone-50 p-4 rounded border border-stone-100">
      <div className="flex-1 min-w-0">
        <div className="font-mono text-base text-stone-900 mb-2 font-medium">{phrase.tajikCyrillic}</div>
        <div className="text-sm text-stone-600">{phrase.transliteration}</div>
        <div className="text-sm text-stone-500 italic mt-2">{phrase.farsi}</div>
      </div>
      <div className="flex items-center gap-4 ml-4 flex-shrink-0">
        <div className="text-sm text-stone-700 font-medium">{phrase.english}</div>
        <button
          onClick={playAudio}
          disabled={isPlaying}
          className="text-base bg-stone-200 hover:bg-stone-300 disabled:bg-stone-300 px-3 py-2 rounded transition-colors"
          title="Play pronunciation (requires OpenAI API key)"
        >
          {isPlaying ? '◼' : '♪'}
        </button>
      </div>
    </div>
  )
}

function ContentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-4 sm:p-8">
      <h3 className="text-xl sm:text-2xl font-light text-stone-900 mb-4 sm:mb-6">{title}</h3>
      <div className="space-y-4 sm:space-y-5 text-base text-stone-700 leading-relaxed">{children}</div>
    </div>
  )
}

function FarsiCallout({ word, farsi, note }: { word: string; farsi: string; note?: string }) {
  return (
    <div className="mt-5 pl-5 border-l-2 border-stone-300 text-base text-stone-600 italic leading-relaxed">
      <p>
        <strong>In Farsi:</strong> {word} → {farsi} {note && `(${note})`}
      </p>
    </div>
  )
}
