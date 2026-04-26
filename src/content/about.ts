export const readingList = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    status: "Completed",
    note:
      "Finishing the first Harry Potter book reminded me that wonder is not childish. It is fuel. The story made me appreciate pacing, friendship, and the feeling of stepping into a larger world.",
    accent: "from-amber-200 via-orange-200 to-rose-200",
    image: '/about/book/harry-potter-1.jpg'
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    status: "Currently Reading",
    note:
      "I am reading this now because it combines pressure, science, and stubborn problem solving. It feels close to engineering: keep learning, keep testing, and do not panic too early.",
    accent: "from-cyan-200 via-sky-200 to-indigo-200",
    image: '/about/book/project-hail-mary.jpg'
  },
] as const;

export const gallery = [
  {
    slug: "sandys-birthday-night",
    src: "/about/street.jpg",
    title: "Sandy's Birthday Night",
    category: "Friends",
    description:
      "This was from Sandy's birthday, not mine. I kept it because it feels like one of those simple nights with friends that becomes more meaningful later.",
  },
  {
    slug: "friends-in-the-park",
    src: "/about/friends-park.jpg",
    title: "Friends in the Park",
    category: "Friends",
    description:
      "A proper group frame from a day that felt light and easy. I wanted more of my people on this page, because they are part of the story too.",
  },
  {
    slug: "fountain-frame",
    src: "/about/friends-fountain.jpg",
    title: "Fountain Frame",
    category: "Places",
    description:
      "This one carries a mix of friendship and place. The garden, the fountain, and the group together make it feel like a complete memory.",
  },
  {
    slug: "garden-walk-portrait",
    src: "/about/park-portrait.jpg",
    title: "Garden Walk Portrait",
    category: "Personal",
    description:
      "A clean portrait from the same outing. I like it because it feels direct and grounded without trying too hard.",
  },
  {
    slug: "campus-gate-familiar-faces",
    src: "/about/friends.jpg",
    title: "Campus Gate, Familiar Faces",
    category: "Friends",
    description:
      "I like this one because it feels rooted in a real season of life. Friends, backpacks, a college gate in the background, and the kind of quick photo that later becomes proof that the phase was real.",
  },
  {
    slug: "proof-that-persistence-pays",
    src: "/about/breakthrough.jpg",
    title: "Proof That Persistence Pays",
    category: "Tech",
    description:
      "This is not a polished success story. It is a working screen, late effort, and the relief of seeing something finally move. A lot of my growth in tech has come from moments exactly like this.",
  },
  {
    slug: "messy-systems-clear-intention",
    src: "/about/workflow.jpg",
    title: "Messy Systems, Clear Intention",
    category: "Tech",
    description:
      "There are days when building feels more frustrating than exciting. I kept this frame because it tells the truth: progress is often made in the middle of confusion, money pressure, and half-working pipelines.",
  },
  {
    slug: "open-water-reset-mindset",
    src: "/about/boats.webp",
    title: "Open Water, Reset Mindset",
    category: "Nature",
    description:
      "This beach and boat photo feels like a mental reset. Whenever life gets too noisy, places like this remind me that not everything needs to be solved in one day.",
  },
  {
    slug: "night-sky-slower-thoughts",
    src: "/about/night.jpg",
    title: "Night Sky, Slower Thoughts",
    category: "Places",
    description:
      "I take photos like this when I need perspective. It is a simple frame, but it carries that quiet feeling of looking up and letting your mind settle for a while.",
  },
  {
    slug: "small-frame-easy-day",
    src: "/about/flowers.jpg",
    title: "A Small Frame From an Easy Day",
    category: "Nature",
    description:
      "This one is soft, simple, and personal. Not every memory has to be dramatic. Sometimes a handful of flowers is enough to represent the mood of an entire day.",
  },
  {
    slug: "unfiltered-self",
    src: "/about/daylight-self.jpg",
    title: "Unfiltered Self",
    category: "Personal",
    description:
      "I wanted to keep at least one frame that does not try too hard. Just daylight, a direct look, and a reminder that personal growth also means getting comfortable being seen as you are.",
  },
  {
    slug: "good-smile-normal-evening",
    src: "/about/smile-cafe.jpg",
    title: "A Good Smile, A Normal Evening",
    category: "Fun",
    description:
      "I added this because not every photo needs a deeper meaning. Sometimes a genuine smile in a public place is enough to remember the day well.",
  },
  {
    slug: "food-court-pause",
    src: "/about/foodcourt.jpg",
    title: "Food Court Pause",
    category: "Fun",
    description:
      "A frame from a casual indoor stop. I like moments like this because they show the in-between parts of life, not just the polished highlights.",
  },
  {
    slug: "color-pattern-and-place",
    src: "/about/mural.jpg",
    title: "Color, Pattern, and Place",
    category: "Places",
    description:
      "This one stayed with me because of the mural behind me. It feels like a mix of culture, color, and the kind of visual memory I always want to keep.",
  },
  {
    slug: "late-night-balcony-mood",
    src: "/about/work-day-vibes.jpg",
    title: "Late-Night Balcony Mood",
    category: "Fun",
    description:
      "A low-key frame from a night where the mood mattered more than the scene. It belongs here because fun is not always loud.",
  },
] as const;

export const breakthroughPosts = [
  {
    slug: "starting-before-confidence",
    category: "Life",
    title: "I Started Before I Felt Ready",
    excerpt:
      "A shift from waiting for confidence to building confidence through repetition.",
    coverImage: "/about/street.jpg",
    publishedLabel: "Mindset Shift",
    paragraphs: [
      "For a long time, I thought confidence had to come first. I thought I needed to feel ready before I could take myself seriously. That belief delayed a lot of action.",
      "The real change happened when I noticed that almost nobody starts fully prepared. People begin with doubt, incomplete skills, and rough work. They improve because they stay in motion long enough for repetition to do its job.",
      "That changed how I approached both life and career. I stopped treating hesitation like a signal to wait. Instead, I started seeing it as a normal part of doing anything that matters.",
      "This mindset helped me apply for work, ship projects, and speak more honestly about what I wanted. Progress became less dramatic and more practical. Show up. Learn something. Repeat.",
      "It still matters to me because it applies everywhere. In tech, in relationships, in reading, and in personal growth, I trust movement more than perfect timing now.",
    ],
  },
  {
    slug: "staying-with-hard-bugs",
    category: "Tech",
    title: "I Learned to Stay With Hard Bugs Longer",
    excerpt:
      "The real engineering upgrade was not a framework. It was patience under pressure.",
    coverImage: "/about/breakthrough.jpg",
    publishedLabel: "Tech Breakthrough",
    paragraphs: [
      "One of the most important technical breakthroughs in my life was realizing that being stuck is not the same as being incapable. Earlier, I used to panic the moment a bug refused to move.",
      "Now I understand that good debugging has its own rhythm. Read the error carefully. Reduce the problem. Test one assumption at a time. Observe what changed. Stay patient enough for the system to reveal itself.",
      "That shift changed the way I work. I spend less energy proving to myself that I am smart, and more energy actually solving the issue in front of me.",
      "Photos of half-working screens matter to me because they represent this stage honestly. Most growth in engineering is not glamorous. It happens while you are tired, frustrated, and still willing to try one more thing.",
      "The result is not just better code. It is a calmer mind. I trust my process more now, especially when things look messy at the start.",
    ],
  },
  {
    slug: "books-made-me-slower-and-better",
    category: "Books",
    title: "Books Made Me Slower, and Better",
    excerpt:
      "Reading began as a habit. It slowly turned into a way of thinking with more depth.",
    coverImage: "/about/night.jpg",
    publishedLabel: "Reading",
    paragraphs: [
      "Reading started becoming important to me when I noticed how fast everything else was. Social feeds, deadlines, quick replies, and constant input can make your mind shallow without you realizing it.",
      "Books do the opposite. They slow me down. They force me to stay with a thought, a scene, or an idea long enough for it to change me a little.",
      "Finishing Harry Potter and the Philosopher's Stone reminded me that imagination has value. It is not separate from ambition. It actually feeds it. A story can make you hopeful again.",
      "Project Hail Mary is hitting a different part of my brain. It makes curiosity feel active and practical. I like how it treats problem solving as a living process rather than a magic trick.",
      "That is why I want books on this page. They are not decoration. They are part of how I am building myself.",
    ],
  },
] as const;

export function getBreakthroughPost(slug: string) {
  return breakthroughPosts.find((post) => post.slug === slug);
}

export const galleryCategories = Array.from(
  new Set(gallery.map((item) => item.category))
);

export function getGalleryItem(slug: string) {
  return gallery.find((item) => item.slug === slug);
}
