import { IBlog } from "@/types";

/**
 * TEMPORARY mock data — used only while building the frontend.
 * Once the DB models + actions are ready, this file will be
 * removed and pages will fetch real data instead.
 */
export const mockBlog: IBlog = {
  title: "Zamonaviy dasturlashni qanday boshlash kerak: 2026-yil qo'llanmasi",
  description:
    "Dasturlashni noldan o'rganishni boshlayotganlar uchun to'liq yo'l xaritasi — qaysi tildan boshlash, qanday resurslardan foydalanish va birinchi loyihangizni qanday yaratish kerak.",
  slug: "zamonaviy-dasturlashni-qanday-boshlash-kerak",
  createdAt: "2026-07-18T10:00:00.000Z",
  image: {
    url: "/assets/hero.png",
  },
  category: {
    name: "Dasturlash",
    slug: "dasturlash",
    blogs: []
  },
  tag: {
    name: "Boshlang'ich",
    slug: "boshlangich",
    blogs: []
  },
  author: {
    id: "author_1",
    name: "Jasur Ungarov",
    bio: "Software Engineer va Ungarov Academy asoschisi. 8 yildan ortiq tajribaga ega, minglab talabalarga dasturlashni o'rgatgan.",
    image: {
      url: "/assets/hero.png",
    },
    blogs: []
  },
  content: {
    html: `
      <p>Dasturlashni o'rganish — bugungi kunda eng qadrli ko'nikmalardan biri. Lekin qayerdan boshlash kerakligini bilmaslik ko'plarni to'xtatib qo'yadi.</p>
      <h2>1. To'g'ri tilni tanlang</h2>
      <p>Boshlang'ichlar uchun Python yoki JavaScript eng yaxshi tanlov hisoblanadi — sodda sintaksis va katta community.</p>
      <h2>2. Amaliyot bilan o'rganing</h2>
      <p>Faqat video ko'rish yetarli emas. Har bir mavzudan keyin kichik loyihalar qiling.</p>
      <h2>3. Real loyihalar yarating</h2>
      <p>Portfolio uchun kamida 3-4 ta real loyiha qiling — bu ish topishda katta yordam beradi.</p>
    `,
  },
};

/**
 * Picks posts related to `current`, preferring the same category.
 * If there aren't enough same-category posts, it fills the rest
 * with the most recent other posts so the section is never empty.
 *
 * TEMPORARY: this runs against the in-memory mock list. Once the
 * DB action is ready, replace this with a real query
 * (same category, excluding current slug, sorted by date, limit N)
 * — the calling code (page.tsx) won't need to change.
 */
export function getRelatedBlogs(
  blogs: IBlog[],
  current: IBlog,
  limit = 3,
): IBlog[] {
  const others = blogs.filter((b) => b.slug !== current.slug);

  const sameCategory = others.filter(
    (b) => b.category.slug === current.category.slug,
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const rest = others
    .filter((b) => b.category.slug !== current.category.slug)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return [...sameCategory, ...rest].slice(0, limit);
}

export const mockBlogsList: IBlog[] = [
  mockBlog,
  {
    ...mockBlog,
    slug: "python-vs-javascript",
    title: "Python vs JavaScript: qaysi birini tanlash kerak?",
    description:
      "Ikkala tilning kuchli va zaif tomonlari, qaysi loyihalar uchun qaysi biri mosligi haqida to'liq taqqoslash.",
    category: { name: "Dasturlash", slug: "dasturlash", blogs: [] },
    createdAt: "2026-07-10T10:00:00.000Z",
  },
  {
    ...mockBlog,
    slug: "portfolio-yaratish",
    title: "Dasturchi sifatida kuchli portfolio qanday yaratiladi",
    description:
      "Ish beruvchilar e'tiborini tortadigan portfolio qanday tuzilishi, qaysi loyihalarni qo'shish kerakligi haqida maslahatlar.",
    category: { name: "Karyera", slug: "karyera", blogs: [] },
    createdAt: "2026-07-02T10:00:00.000Z",
  },
  {
    ...mockBlog,
    slug: "ingliz-tili-oquv-metodlari",
    title: "Ingliz tilini tez o'rganishning 5 ta samarali metodi",
    description:
      "Til o'rganishda eng ko'p uchraydigan xatolar va ularni oldini olish uchun amaliy tavsiyalar.",
    category: { name: "Til kurslari", slug: "til-kurslari", blogs: [] },
    tag: { name: "Metodika", slug: "metodika", blogs: [] },
    createdAt: "2026-06-25T10:00:00.000Z",
  },
  {
    ...mockBlog,
    slug: "biznes-konsalting-nima",
    title: "Biznes konsalting xizmati sizga qanday foyda beradi",
    description:
      "Kichik va o'rta biznes egalari uchun konsalting xizmatining amaliy afzalliklari haqida.",
    category: { name: "Konsalting", slug: "konsalting", blogs: [] },
    createdAt: "2026-06-18T10:00:00.000Z",
  },
  {
    ...mockBlog,
    slug: "makkada-talim-imkoniyatlari",
    title: "Makkada diniy ta'lim olish imkoniyatlari",
    description:
      "Iqro Arabia dasturi orqali Makkada ta'lim olish jarayoni va talablar haqida to'liq ma'lumot.",
    category: { name: "Iqro Arabia", slug: "iqro-arabia", blogs: [] },
    createdAt: "2026-06-10T10:00:00.000Z",
  },
  {
    ...mockBlog,
    slug: "react-vs-vue-2026",
    title: "React vs Vue: 2026-yilda qaysi frameworkni tanlash kerak?",
    description:
      "Ikkala framework'ning ekotizimi, ish bozoridagi talabi va o'rganish egri chizig'i bo'yicha solishtiruv.",
    category: { name: "Dasturlash", slug: "dasturlash", blogs: [] },
    createdAt: "2026-06-02T10:00:00.000Z",
  },
  {
    ...mockBlog,
    slug: "remote-ish-topish",
    title: "Remote dasturchi sifatida xorijiy kompaniyada ishlash yo'llari",
    description:
      "LinkedIn, Upwork va boshqa platformalarda xorijiy kompaniyalar bilan qanday ishlash kerak.",
    category: { name: "Karyera", slug: "karyera", blogs: [] },
    createdAt: "2026-05-20T10:00:00.000Z",
  },
  {
    ...mockBlog,
    slug: "ielts-tayyorgarlik",
    title: "IELTS imtihoniga uyda qanday tayyorlanish mumkin",
    description:
      "Reading, Listening, Writing va Speaking bo'limlariga oid amaliy mashqlar va manbalar ro'yxati.",
    category: { name: "Til kurslari", slug: "til-kurslari", blogs: [] },
    createdAt: "2026-05-14T10:00:00.000Z",
  },
  {
    ...mockBlog,
    slug: "startup-uchun-konsalting",
    title: "Startup loyihangiz uchun qanday konsalting xizmati kerak",
    description:
      "Boshlang'ich bosqichdagi startuplar ko'pincha e'tibor bermaydigan konsalting yo'nalishlari.",
    category: { name: "Konsalting", slug: "konsalting", blogs: [] },
    createdAt: "2026-05-05T10:00:00.000Z",
  },
  {
    ...mockBlog,
    slug: "arab-tili-alifbosi",
    title: "Arab tili alifbosini noldan o'rganish qo'llanmasi",
    description:
      "Harflarning yozilishi, talaffuzi va birikish qoidalari haqida boshlang'ichlar uchun darslik.",
    category: { name: "Iqro Arabia", slug: "iqro-arabia", blogs: [] },
    createdAt: "2026-04-28T10:00:00.000Z",
  },
  {
    ...mockBlog,
    slug: "typescript-boshlanguchlar-uchun",
    title: "TypeScript'ni JavaScript dasturchilari uchun tushuntirish",
    description:
      "Type xavfsizligi nima uchun kerak va uni loyihangizga qanday qo'shish mumkin.",
    category: { name: "Dasturlash", slug: "dasturlash", blogs: [] },
    createdAt: "2026-04-15T10:00:00.000Z",
  },
];