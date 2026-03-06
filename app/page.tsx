import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[var(--background)]">
      <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium text-[var(--muted-foreground)]">
            바리스타를 생각하는 플랫폼
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            바리스타 취업은
            <br />
            <span className="text-[#ea580c]">커폴리오</span>에서 해요.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#444444] sm:text-lg">
            이력서와 포트폴리오를 한곳에서 관리하고,
            <br className="hidden sm:block" />
            나에게 맞는 카페를 만나볼 수 있어요.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <Link
            href="/signup?type=barista"
            className="inline-flex items-center gap-2 rounded-full bg-[#ea580c] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#c2410c]"
          >
            지금 바로 이력서 등록하기
            <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 448 512" className="h-4 w-4">
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
            </svg>
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <p className="mb-6 text-center text-sm font-medium text-[var(--muted-foreground)]">
            어떻게 시작할까요?
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/signup?type=barista"
              className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-left transition-all hover:border-[#ea580c] hover:shadow-sm"
            >
              <span className="mb-4 text-4xl" aria-hidden>☕️</span>
              <h2 className="font-display text-xl font-semibold text-[var(--foreground)]">
                바리스타로 시작하기
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                경력·자격·포트폴리오를 관리하고 채용공고에 지원하거나, 카페의 헤드헌팅을 받아볼 수 있어요.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-[#ea580c] group-hover:underline">
                시작하기 →
              </span>
            </Link>
            <Link
              href="/signup?type=cafe"
              className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-left transition-all hover:border-[#ea580c] hover:shadow-sm"
            >
              <span className="mb-4 text-4xl" aria-hidden>🏢</span>
              <h2 className="font-display text-xl font-semibold text-[var(--foreground)]">
                카페(사업자)로 시작하기
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                채용공고를 올리고, 조건에 맞는 바리스타를 찾아 헤드헌팅으로 연락해볼 수 있어요.
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-[#ea580c] group-hover:underline">
                시작하기 →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--section-alt)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-center text-2xl font-semibold text-[var(--foreground)] sm:text-3xl">
            커폴리오가 필요한 이유
          </h2>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            <li className="text-center">
              <span className="mb-3 inline-block text-3xl" aria-hidden>📋</span>
              <h3 className="font-medium text-[var(--foreground)]">이력서·포트폴리오</h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                경력, 자격증, 수상, 구직 조건을 표준화된 형태로 관리해요
              </p>
            </li>
            <li className="text-center">
              <span className="mb-3 inline-block text-3xl" aria-hidden>🔗</span>
              <h3 className="font-medium text-[var(--foreground)]">양방향 매칭</h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                바리스타는 구직하고, 카페는 인재 검색·헤드헌팅까지 해요
              </p>
            </li>
            <li className="text-center">
              <span className="mb-3 inline-block text-3xl" aria-hidden>🎯</span>
              <h3 className="font-medium text-[var(--foreground)]">바리스타 전문</h3>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                아르바이트가 아닌, 커리어로 바리스타를 바라보는 플랫폼이에요
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[var(--section-white)] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
            지금 바로 시작해요
          </h2>
          <p className="mt-3 text-[var(--muted-foreground)]">
            무료로 이력서를 만들고, 채용공고를 둘러볼 수 있어요.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup?type=barista"
              className="inline-flex items-center gap-2 rounded-full bg-[#ea580c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c2410c]"
            >
              지금 바로 이력서 등록하기
              <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 448 512" className="h-4 w-4">
                <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
              </svg>
            </Link>
            <Link
              href="/jobs"
              className="rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
            >
              채용공고 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
