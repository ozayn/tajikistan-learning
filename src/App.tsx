import { useState } from 'react'

type Section = 'history' | 'culture' | 'politics' | 'language' | 'cities' | 'photography'

interface Phrase {
  tajikCyrillic: string
  transliteration: string
  farsi: string
  english: string
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('history')

  const sections = [
    { id: 'history' as Section, label: 'History', emoji: '⏰' },
    { id: 'culture' as Section, label: 'Culture', emoji: '🎭' },
    { id: 'politics' as Section, label: 'Politics', emoji: '🏛️' },
    { id: 'language' as Section, label: 'Language', emoji: '📖' },
    { id: 'cities' as Section, label: 'Cities', emoji: '🗺️' },
    { id: 'photography' as Section, label: 'Photography', emoji: '📷' },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-5xl font-light text-stone-900 mb-2">Tajikistan</h1>
          <p className="text-lg text-stone-600 font-light">A learning journey through history, culture, and language</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-stone-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 px-1 border-b-2 transition-all flex items-center gap-2 text-sm font-medium ${
                  activeSection === section.id
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-500 hover:text-stone-700'
                }`}
              >
                <span className="text-base">{section.emoji}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {activeSection === 'history' && <HistorySection />}
        {activeSection === 'culture' && <CultureSection />}
        {activeSection === 'politics' && <PoliticsSection />}
        {activeSection === 'language' && <LanguageSection />}
        {activeSection === 'cities' && <CitiesSection />}
        {activeSection === 'photography' && <PhotographySection />}
      </main>
    </div>
  )
}

function HistorySection() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-light text-stone-900 mb-8">History of Tajikistan</h2>

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
    </div>
  )
}

function CultureSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-light text-stone-900 mb-8">Culture & Traditions</h2>

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
      <h2 className="text-3xl font-light text-stone-900 mb-8">Politics & Government</h2>

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
      <h2 className="text-3xl font-light text-stone-900 mb-8">Language & Expressions</h2>

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
      <h2 className="text-3xl font-light text-stone-900 mb-8">Three Cities</h2>

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
      <h2 className="text-3xl font-light text-stone-900 mb-8">Photography & Your Workshop</h2>

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

// Components
function PhraseRow({ phrase }: { phrase: Phrase }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const playAudio = async () => {
    if (!phrase.transliteration) return
    setIsPlaying(true)
    try {
      const apiKey = process.env.REACT_APP_OPENAI_KEY
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
        const audio = new Audio(url)
        audio.play()
      }
    } catch (error) {
      console.error('Audio playback failed:', error)
    } finally {
      setIsPlaying(false)
    }
  }

  return (
    <div className="flex items-start justify-between bg-stone-50 p-3 rounded border border-stone-100">
      <div className="flex-1 min-w-0">
        <div className="font-mono text-sm text-stone-900 mb-1">{phrase.tajikCyrillic}</div>
        <div className="text-xs text-stone-600">{phrase.transliteration}</div>
        <div className="text-xs text-stone-500 italic mt-1">{phrase.farsi}</div>
      </div>
      <div className="flex items-center gap-3 ml-4 flex-shrink-0">
        <div className="text-sm text-stone-700">{phrase.english}</div>
        <button
          onClick={playAudio}
          disabled={isPlaying}
          className="text-sm bg-stone-200 hover:bg-stone-300 disabled:bg-stone-300 px-2 py-1 rounded transition-colors"
          title="Play pronunciation (requires OpenAI API key)"
        >
          {isPlaying ? '⏸' : '🔊'}
        </button>
      </div>
    </div>
  )
}

function ContentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-stone-200 p-8">
      <h3 className="text-xl font-medium text-stone-900 mb-4">{title}</h3>
      <div className="space-y-4 text-stone-700 leading-relaxed">{children}</div>
    </div>
  )
}

function FarsiCallout({ word, farsi, note }: { word: string; farsi: string; note?: string }) {
  return (
    <div className="mt-4 pl-4 border-l-2 border-stone-300 text-sm text-stone-600 italic">
      <p>
        <strong>In Farsi:</strong> {word} → {farsi} {note && `(${note})`}
      </p>
    </div>
  )
}
