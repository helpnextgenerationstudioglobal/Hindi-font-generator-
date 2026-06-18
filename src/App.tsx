import { useMemo, useState } from "react";

type FontOption = {
  name: string;
  family: string;
  category: string;
  note: string;
};

const sampleText =
  "हिन्दी टाइपोग्राफी साफ, संतुलित और पढ़ने में आसान होनी चाहिए।";

const fontOptions: FontOption[] = [
  { name: "Noto Sans Devanagari", family: "'Noto Sans Devanagari', sans-serif", category: "Sans", note: "Balanced screen readability" },
  { name: "Noto Serif Devanagari", family: "'Noto Serif Devanagari', serif", category: "Serif", note: "Editorial text and long reads" },
  { name: "Anek Devanagari", family: "'Anek Devanagari', sans-serif", category: "Sans", note: "Contemporary UI titles" },
  { name: "Hind", family: "'Hind', sans-serif", category: "Sans", note: "Clean interface copy" },
  { name: "Mukta", family: "'Mukta', sans-serif", category: "Sans", note: "Dense paragraphs and labels" },
  { name: "Karma", family: "'Karma', serif", category: "Serif", note: "Books and essays" },
  { name: "Tiro Devanagari Hindi", family: "'Tiro Devanagari Hindi', serif", category: "Serif", note: "Formal Hindi composition" },
  { name: "Tiro Devanagari Marathi", family: "'Tiro Devanagari Marathi', serif", category: "Serif", note: "Traditional Devanagari serif" },
  { name: "Tiro Devanagari Sanskrit", family: "'Tiro Devanagari Sanskrit', serif", category: "Serif", note: "Classical Devanagari tone" },
  { name: "Gotu", family: "'Gotu', sans-serif", category: "Display", note: "Soft display lettering" },
  { name: "Sahitya", family: "'Sahitya', serif", category: "Serif", note: "Literary Hindi text" },
  { name: "Chandas", family: "'Chandas', serif", category: "Serif", note: "Scholarly Devanagari" },
  { name: "Yatra One", family: "'Yatra One', cursive", category: "Display", note: "Decorative headings" },
  { name: "Martel", family: "'Martel', serif", category: "Serif", note: "Serious publishing layouts" },
  { name: "Martel Sans", family: "'Martel Sans', sans-serif", category: "Sans", note: "Reliable body copy" },
  { name: "Khand", family: "'Khand', sans-serif", category: "Display", note: "Compact news headlines" },
  { name: "Kalam", family: "'Kalam', cursive", category: "Handwritten", note: "Natural handwritten tone" },
  { name: "Rajdhani", family: "'Rajdhani', sans-serif", category: "Display", note: "Modern title rhythm" },
  { name: "Modak", family: "'Modak', cursive", category: "Display", note: "Heavy decorative signage" },
  { name: "Baloo 2", family: "'Baloo 2', cursive", category: "Display", note: "Friendly social graphics" },
  { name: "Baloo Bhai 2", family: "'Baloo Bhai 2', cursive", category: "Display", note: "Rounded headline work" },
  { name: "Arya", family: "'Arya', sans-serif", category: "Sans", note: "Simple Hindi paragraphs" },
  { name: "Asar", family: "'Asar', serif", category: "Serif", note: "Warm editorial serif" },
  { name: "Biryani", family: "'Biryani', sans-serif", category: "Sans", note: "Clear digital articles" },
  { name: "Eczar", family: "'Eczar', serif", category: "Serif", note: "High personality display" },
  { name: "Glegoo", family: "'Glegoo', serif", category: "Serif", note: "Low contrast reading" },
  { name: "Halant", family: "'Halant', serif", category: "Serif", note: "Magazine text blocks" },
  { name: "Jaldi", family: "'Jaldi', sans-serif", category: "Sans", note: "Fast UI scanning" },
  { name: "Kadwa", family: "'Kadwa', serif", category: "Serif", note: "Stable formal documents" },
  { name: "Khula", family: "'Khula', sans-serif", category: "Sans", note: "Neutral screen text" },
  { name: "Kurale", family: "'Kurale', serif", category: "Serif", note: "Distinctive editorial style" },
  { name: "Laila", family: "'Laila', serif", category: "Serif", note: "Soft story formats" },
  { name: "Rhodium Libre", family: "'Rhodium Libre', serif", category: "Serif", note: "Classic Devanagari reading" },
  { name: "Rozha One", family: "'Rozha One', serif", category: "Display", note: "Strong mastheads" },
  { name: "Sarala", family: "'Sarala', sans-serif", category: "Sans", note: "Everyday Hindi text" },
  { name: "Sura", family: "'Sura', serif", category: "Serif", note: "Formal Hindi documents" },
  { name: "Teko", family: "'Teko', sans-serif", category: "Display", note: "Condensed banners" },
  { name: "Tillana", family: "'Tillana', cursive", category: "Display", note: "Expressive typography" },
  { name: "Yantramanav", family: "'Yantramanav', sans-serif", category: "Sans", note: "Modern UI copy" },
  { name: "Amiko", family: "'Amiko', sans-serif", category: "Sans", note: "Compact interface text" },
  { name: "Cambay", family: "'Cambay', sans-serif", category: "Sans", note: "Readable web copy" },
  { name: "Dekko", family: "'Dekko', cursive", category: "Handwritten", note: "Casual notes and captions" },
  { name: "Palanquin", family: "'Palanquin', sans-serif", category: "Sans", note: "Clean editorial UI" },
  { name: "Palanquin Dark", family: "'Palanquin Dark', sans-serif", category: "Display", note: "Bold title hierarchy" },
  { name: "Poppins", family: "'Poppins', sans-serif", category: "Sans", note: "Contemporary brand use" },
  { name: "Akshar", family: "'Akshar', sans-serif", category: "Sans", note: "Sharp digital typography" },
  { name: "Sarpanch", family: "'Sarpanch', sans-serif", category: "Display", note: "Technical title style" },
  { name: "Siddhanta", family: "'Siddhanta', serif", category: "Serif", note: "Classical language support" },
  { name: "Mangal", family: "Mangal, 'Noto Sans Devanagari', sans-serif", category: "System", note: "Common government Unicode font" },
  { name: "Nirmala UI", family: "'Nirmala UI', 'Noto Sans Devanagari', sans-serif", category: "System", note: "Windows UI readability" },
  { name: "Kokila", family: "Kokila, 'Noto Serif Devanagari', serif", category: "System", note: "Desktop publishing option" },
  { name: "Aparajita", family: "Aparajita, 'Noto Serif Devanagari', serif", category: "System", note: "Formal document style" },
  { name: "Utsaah", family: "Utsaah, 'Noto Sans Devanagari', sans-serif", category: "System", note: "Windows document font" },
  { name: "Sanskrit Text", family: "'Sanskrit Text', 'Noto Serif Devanagari', serif", category: "System", note: "Classical text composition" },
  { name: "Lohit Devanagari", family: "'Lohit Devanagari', 'Noto Sans Devanagari', sans-serif", category: "System", note: "Open-source environments" },
  { name: "Kruti Dev 010", family: "'Kruti Dev 010', 'Noto Sans Devanagari', sans-serif", category: "Legacy", note: "Preview only when installed" },
  { name: "DevLys 010", family: "'DevLys 010', 'Noto Sans Devanagari', sans-serif", category: "Legacy", note: "Preview only when installed" },
  { name: "Shusha", family: "Shusha, 'Noto Sans Devanagari', sans-serif", category: "Legacy", note: "Preview only when installed" },
  { name: "Chanakya", family: "Chanakya, 'Noto Sans Devanagari', sans-serif", category: "Legacy", note: "Preview only when installed" },
  { name: "Adobe Devanagari", family: "'Adobe Devanagari', 'Noto Serif Devanagari', serif", category: "System", note: "Professional desktop publishing" },
];

const guideSections = [
  {
    title: "Hindi Font Generator Meaning and Purpose",
    body: [
      "A Hindi font generator is a browser-based workspace for typing, previewing, and comparing Hindi text in Devanagari typefaces. It helps writers, publishers, journalists, students, and office teams check how a paragraph will look before it moves into a document, post, PDF, or website.",
      "The main problem it solves is font incompatibility. Hindi text can look broken when a device is missing the correct font or when legacy encodings are mixed with Unicode. A clean preview tool makes those differences visible before the text is published.",
    ],
  },
  {
    title: "How an Online Hindi Font Generator Works",
    body: [
      "The tool keeps the text in Unicode and changes the font family used for rendering. That means the written characters remain copyable and searchable while the visual style changes instantly in the browser.",
      "Matras, conjunct consonants, spacing, and line height are handled by the selected font and the browser shaping engine. The result is a practical preview for headlines, captions, educational content, notices, and long-form paragraphs.",
    ],
  },
  {
    title: "Unicode Hindi Fonts",
    body: [
      "Unicode Hindi fonts are the best choice for websites, mobile apps, search engines, and modern office documents. Fonts such as Noto Sans Devanagari, Noto Serif Devanagari, Hind, Mukta, Mangal, and Nirmala UI keep the text stable across platforms.",
      "For SEO and accessibility, Unicode is especially important because screen readers, search engines, and content management systems can understand the actual Devanagari characters instead of treating the text as decorative glyphs.",
    ],
  },
  {
    title: "Kruti Dev and Legacy Hindi Fonts",
    body: [
      "Legacy fonts such as Kruti Dev, DevLys, Chanakya, and Shusha still appear in printing presses, older government workflows, and archived documents. These fonts use older character mappings, so previewing them is different from converting Unicode text into a legacy encoding.",
      "This redesign keeps legacy font stacks available for visual checks when those fonts are installed on the device. For official conversion, always use a mapping-accurate Unicode to Kruti Dev or Kruti Dev to Unicode converter.",
    ],
  },
  {
    title: "Copy Paste Workflow",
    body: [
      "The copy button copies the plain Unicode Hindi text so it can be pasted into Word, Google Docs, websites, social media captions, PDF workflows, and publishing systems. The destination app controls whether the visual font style is retained.",
      "For professional publishing, copy the text first, then apply the matching Hindi font in the final design or document software. This keeps the content clean while allowing precise typographic control.",
    ],
  },
  {
    title: "Online Hindi Typing Without Installation",
    body: [
      "A web-based Hindi typing and preview tool avoids software installation and works on modern desktop and mobile browsers. Users can paste Hindi text, type directly with their device keyboard, or prepare content from another typing workflow.",
      "The interface is intentionally simple: type, select a font, adjust size, copy, and continue. This keeps the tool fast for students, bloggers, educators, journalists, and office users.",
    ],
  },
  {
    title: "Common Hindi Font Issues",
    body: [
      "Broken Hindi text usually comes from unsupported fonts, mixed encodings, missing glyphs, or copying legacy text into a Unicode-only environment. Switching to a modern Unicode font fixes most web and mobile display problems.",
      "If text alignment changes after copy paste, confirm that the destination document has the same font installed and that the text has not been converted into a non-Unicode legacy mapping.",
    ],
  },
  {
    title: "Data Privacy and Usage Safety",
    body: [
      "The preview interaction runs locally in the browser. The typed text is not stored by this React app, and the font preview does not require an account or upload workflow.",
      "This privacy-focused approach is important for drafts, official notices, classroom material, editorial work, and unpublished documents.",
    ],
  },
];

const faqItems = [
  ["Is this Hindi Font Generator free?", "Yes. The interface is designed as a free online Hindi font preview tool."],
  ["Can I use the generated Hindi text commercially?", "Unicode text can generally be used in commercial documents, websites, and publishing. Check the license of the final font you use in your design software."],
  ["Does this tool support Kruti Dev conversion?", "This version focuses on visual font preview and Unicode copy paste. Legacy fonts can be previewed only if they are installed on the device."],
  ["Which Hindi font is best for government forms?", "Mangal and Nirmala UI are common Unicode choices for official Hindi documents, but always follow the specific instruction on the form."],
  ["Does the tool work on mobile?", "Yes. The layout is responsive and works in modern Android and iOS browsers."],
  ["Do I need to install software?", "No installation is required for Unicode preview. Some system or legacy fonts only display when installed locally."],
  ["Can I preview long Hindi paragraphs?", "Yes. The textarea and preview area are built for both short captions and longer paragraphs."],
  ["Can I type Hindi using English letters?", "This page previews Hindi text. You can paste text from a phonetic Hindi typing tool and then compare fonts here."],
  ["Why does Kruti Dev look broken in some software?", "Kruti Dev uses legacy mappings, so it can break in Unicode-first software unless the right font and encoding workflow are used."],
  ["Is Unicode better for SEO?", "Yes. Unicode Hindi text is searchable, accessible, and stable across browsers and devices."],
  ["Can I copy Hindi text into Word or PDF files?", "Yes. Use the copy button for text, then apply the required Hindi font inside Word, Google Docs, or your PDF workflow."],
  ["Does the website store my typed text?", "No. The React preview state stays in your browser session and is not submitted through a form."],
];

const navItems = [
  ["Tool", "#tool"],
  ["Fonts", "#fonts"],
  ["Guide", "#article"],
  ["Privacy", "#privacy"],
  ["Contact", "#contact"],
];

export default function App() {
  const [text, setText] = useState(sampleText);
  const [selectedFamily, setSelectedFamily] = useState(fontOptions[0].family);
  const [fontSize, setFontSize] = useState(38);
  const [lineHeight, setLineHeight] = useState(1.55);
  const [fontQuery, setFontQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedFont =
    fontOptions.find((font) => font.family === selectedFamily) ?? fontOptions[0];
  const previewText = text.trim().length > 0 ? text : sampleText;

  const filteredFonts = useMemo(() => {
    const query = fontQuery.trim().toLowerCase();
    if (!query) return fontOptions;

    return fontOptions.filter((font) =>
      [font.name, font.category, font.note].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [fontQuery]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(previewText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f1e7] text-[#211912]">
      <header className="sticky top-0 z-50 border-b border-[#211912]/10 bg-[#f7f1e7]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <a href="#top" className="font-serif text-xl font-bold tracking-tight text-[#211912]">
            Hindi Font Generator
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-[#6e5946] md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-[#211912]">
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#tool"
            className="rounded-full bg-[#211912] px-4 py-2 text-sm font-semibold text-[#fff7ea] transition hover:bg-[#7d3d1d]"
          >
            Open Tool
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative isolate min-h-[calc(100vh-73px)] overflow-hidden">
          <div className="hero-type-plane absolute inset-0" aria-hidden="true">
            <div className="absolute -right-[18vw] top-[8vh] space-y-1 opacity-95">
              <div className="hero-type-row">क ख ग घ हिन्दी</div>
              <div className="hero-type-row">भाषा अक्षर शब्द</div>
              <div className="hero-type-row">देवनागरी लेखन</div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f1e7] via-[#f7f1e7]/88 to-[#f7f1e7]/30" />

          <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-5 py-20 sm:px-8">
            <div className="max-w-4xl">
              <h1 className="reveal-up max-w-4xl font-serif text-6xl font-black leading-[0.92] tracking-[-0.075em] text-[#211912] sm:text-7xl lg:text-8xl">
                Hindi Font Generator
              </h1>
              <p
                className="reveal-up mt-7 max-w-2xl text-lg leading-8 text-[#5f4f40] sm:text-xl"
                style={{ animationDelay: "120ms" }}
              >
                Preview professional Devanagari fonts, refine Hindi text spacing, and copy clean Unicode content for publishing, classrooms, offices, and social media.
              </p>
              <div
                className="reveal-up mt-10 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "220ms" }}
              >
                <a
                  href="#tool"
                  className="inline-flex items-center justify-center rounded-full bg-[#211912] px-7 py-3 text-base font-bold text-[#fff7ea] transition hover:bg-[#7d3d1d]"
                >
                  Start generating
                </a>
                <a
                  href="#fonts"
                  className="inline-flex items-center justify-center rounded-full border border-[#211912]/25 px-7 py-3 text-base font-bold text-[#211912] transition hover:border-[#211912] hover:bg-[#211912]/5"
                >
                  Browse fonts
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="tool" className="scroll-mt-24 border-y border-[#211912]/10 bg-[#fffaf2]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:py-28">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9c5a2c]">Unicode preview tool</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
                Type once. Compare Hindi fonts with control.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#6e5946]">
                Use the workspace to test Devanagari tone, size, rhythm, and line height before you place text into a real publishing workflow.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#806c59]">
                Copying keeps the Unicode text clean. Apply the selected font again inside your document editor, CMS, or design tool when you need the visual styling preserved.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#211912]/12 bg-[#f7f1e7] p-4 shadow-[0_24px_80px_rgba(33,25,18,0.10)] sm:p-6">
              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-bold text-[#4a392b]" htmlFor="inputText">
                  Hindi text
                  <textarea
                    id="inputText"
                    lang="hi"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Type or paste Hindi text here..."
                    className="min-h-44 resize-y rounded-3xl border border-[#211912]/12 bg-[#fffaf2] px-5 py-4 text-lg leading-8 text-[#211912] outline-none transition placeholder:text-[#9a8875] focus:border-[#7d3d1d] focus:ring-4 focus:ring-[#7d3d1d]/10"
                  />
                </label>

                <div className="grid gap-3 md:grid-cols-[1fr_0.7fr_0.7fr]">
                  <label className="grid gap-2 text-sm font-bold text-[#4a392b]" htmlFor="fontSelect">
                    Font family
                    <select
                      id="fontSelect"
                      value={selectedFamily}
                      onChange={(event) => setSelectedFamily(event.target.value)}
                      className="h-12 rounded-full border border-[#211912]/12 bg-[#fffaf2] px-4 text-sm outline-none transition focus:border-[#7d3d1d] focus:ring-4 focus:ring-[#7d3d1d]/10"
                    >
                      {fontOptions.map((font) => (
                        <option key={font.name} value={font.family}>
                          {font.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2 text-sm font-bold text-[#4a392b]" htmlFor="fontSize">
                    Size: {fontSize}px
                    <input
                      id="fontSize"
                      type="range"
                      min="22"
                      max="72"
                      value={fontSize}
                      onChange={(event) => setFontSize(Number(event.target.value))}
                      className="h-12 accent-[#7d3d1d]"
                    />
                  </label>

                  <label className="grid gap-2 text-sm font-bold text-[#4a392b]" htmlFor="lineHeight">
                    Line: {lineHeight.toFixed(2)}
                    <input
                      id="lineHeight"
                      type="range"
                      min="1.1"
                      max="2.1"
                      step="0.05"
                      value={lineHeight}
                      onChange={(event) => setLineHeight(Number(event.target.value))}
                      className="h-12 accent-[#7d3d1d]"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-3 border-t border-[#211912]/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#211912]">{selectedFont.name}</p>
                    <p className="text-sm text-[#806c59]">{selectedFont.category} - {selectedFont.note}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setText("")}
                      className="rounded-full border border-[#211912]/18 px-5 py-2.5 text-sm font-bold text-[#211912] transition hover:border-[#211912] hover:bg-[#211912]/5"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="rounded-full bg-[#211912] px-5 py-2.5 text-sm font-bold text-[#fff7ea] transition hover:bg-[#7d3d1d]"
                    >
                      {copied ? "Copied" : "Copy text"}
                    </button>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-dashed border-[#211912]/20 bg-[#fffaf2] p-5 sm:p-7">
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-[#9c5a2c]">Live preview</p>
                  <div
                    lang="hi"
                    className="preview-caret min-h-36 whitespace-pre-wrap break-words text-[#211912]"
                    style={{ fontFamily: selectedFamily, fontSize, lineHeight }}
                  >
                    {previewText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="fonts" className="scroll-mt-24 bg-[#f7f1e7]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9c5a2c]">Font library</p>
                <h2 className="mt-4 max-w-2xl font-serif text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
                  Fifty plus Devanagari previews in one professional list.
                </h2>
              </div>
              <div className="lg:justify-self-end">
                <label className="grid min-w-full gap-2 text-sm font-bold text-[#4a392b] sm:min-w-96" htmlFor="fontSearch">
                  Search font, style, or use case
                  <input
                    id="fontSearch"
                    value={fontQuery}
                    onChange={(event) => setFontQuery(event.target.value)}
                    placeholder="Try serif, display, Mangal, publishing..."
                    className="h-12 rounded-full border border-[#211912]/12 bg-[#fffaf2] px-5 text-sm outline-none transition placeholder:text-[#9a8875] focus:border-[#7d3d1d] focus:ring-4 focus:ring-[#7d3d1d]/10"
                  />
                </label>
              </div>
            </div>

            <div className="mt-10 divide-y divide-[#211912]/10 border-y border-[#211912]/10">
              {filteredFonts.map((font) => {
                const isSelected = font.family === selectedFamily;
                return (
                  <button
                    key={font.name}
                    type="button"
                    onClick={() => setSelectedFamily(font.family)}
                    className={`font-row-motion grid w-full gap-3 px-0 py-5 text-left md:grid-cols-[0.7fr_1fr_0.45fr] md:items-center ${
                      isSelected ? "bg-[#211912] px-4 text-[#fff7ea] md:px-6" : "text-[#211912] hover:bg-[#fffaf2]"
                    }`}
                  >
                    <span className="font-bold">{font.name}</span>
                    <span lang="hi" className="text-2xl leading-relaxed md:text-3xl" style={{ fontFamily: font.family }}>
                      सुन्दर हिन्दी अक्षर और स्पष्ट पाठ
                    </span>
                    <span className={`text-sm ${isSelected ? "text-[#f4d9bf]" : "text-[#806c59]"}`}>
                      {font.category} - {font.note}
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredFonts.length === 0 && (
              <p className="mt-8 text-[#806c59]">No matching font found. Try a broader search term.</p>
            )}
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-y border-[#211912]/10 bg-[#211912] text-[#fff7ea]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#d89a62]">About the tool</p>
              <h2 className="mt-4 font-serif text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
                Built for real Hindi publishing work.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-[#ead8c4]">
              <p>
                Hindi Font Generator is a focused Devanagari preview workspace for people who need typography decisions without clutter. It is useful for newsrooms, schools, publishers, government drafting, social posts, and website copy.
              </p>
              <p>
                The experience is intentionally direct: write Hindi text, compare professional fonts, tune size and line height, then copy clean Unicode text into the destination workflow.
              </p>
              <div className="grid gap-6 pt-6 md:grid-cols-3">
                {[
                  ["Accurate preview", "Compare tone, spacing, and readability before publishing."],
                  ["Fast workflow", "No login, no upload form, no complicated editing panels."],
                  ["Privacy focused", "The typed preview stays in the browser interface."],
                ].map(([title, body]) => (
                  <div key={title} className="border-t border-[#fff7ea]/18 pt-4">
                    <h3 className="font-bold text-[#fff7ea]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#d8c4ad]">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="article" className="scroll-mt-24 bg-[#fffaf2]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9c5a2c]">Typography guide</p>
              <h2 className="mt-4 font-serif text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
                Hindi typography, Unicode fonts, and practical font preview decisions.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#6e5946]">
                A concise guide for choosing Hindi fonts, avoiding broken Devanagari text, and keeping copy paste workflows reliable across modern platforms.
              </p>
            </div>

            <article className="mt-12 divide-y divide-[#211912]/10 border-y border-[#211912]/10">
              {guideSections.map((section) => (
                <section key={section.title} className="grid gap-6 py-10 lg:grid-cols-[0.62fr_1fr]">
                  <h3 className="font-serif text-2xl font-black leading-tight tracking-[-0.03em] text-[#211912] sm:text-3xl">
                    {section.title}
                  </h3>
                  <div className="space-y-5 text-base leading-8 text-[#5f4f40] sm:text-lg">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </article>
          </div>
        </section>

        <section className="bg-[#f7f1e7]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9c5a2c]">FAQ</p>
                <h2 className="mt-4 font-serif text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">
                  Common questions about Hindi fonts.
                </h2>
              </div>
              <div className="divide-y divide-[#211912]/10 border-y border-[#211912]/10">
                {faqItems.map(([question, answer]) => (
                  <details key={question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-[#211912]">
                      {question}
                      <span className="text-2xl leading-none text-[#9c5a2c] transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-4 max-w-3xl leading-7 text-[#6e5946]">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="privacy" className="scroll-mt-24 border-y border-[#211912]/10 bg-[#fffaf2]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9c5a2c]">Privacy Policy</p>
              <h2 className="mt-4 font-serif text-4xl font-black tracking-[-0.045em]">Private by design.</h2>
              <p className="mt-6 text-lg leading-8 text-[#6e5946]">
                This Hindi Font Generator does not collect, store, or transmit your typed text through a form. Preview interaction happens locally in the browser.
              </p>
            </div>
            <div id="contact" className="scroll-mt-24 lg:border-l lg:border-[#211912]/10 lg:pl-10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#9c5a2c]">Contact Us</p>
              <h2 className="mt-4 font-serif text-4xl font-black tracking-[-0.045em]">Support and feedback.</h2>
              <p className="mt-6 text-lg leading-8 text-[#6e5946]">
                Email: <a className="font-bold text-[#211912] underline decoration-[#9c5a2c]/40 underline-offset-4" href="mailto:nextgenerationstudioglobal@gmail.com">nextgenerationstudioglobal@gmail.com</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#211912] text-[#fff7ea]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <h2 className="font-serif text-2xl font-black tracking-[-0.04em]">Hindi Font Generator</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#d8c4ad]">
              Professional Devanagari font preview tool for clean Unicode Hindi typography.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Pages</h3>
            <div className="mt-3 grid gap-2 text-sm text-[#d8c4ad]">
              <a href="#about" className="hover:text-white">About</a>
              <a href="#privacy" className="hover:text-white">Privacy</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Tool</h3>
            <div className="mt-3 grid gap-2 text-sm text-[#d8c4ad]">
              <a href="#tool" className="hover:text-white">Font Generator</a>
              <a href="#fonts" className="hover:text-white">Font Library</a>
              <a href="#article" className="hover:text-white">Typography Guide</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#fff7ea]/10 px-5 py-4 text-center text-sm text-[#bca78e]">
          © 2026 Hindi Font Generator. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
