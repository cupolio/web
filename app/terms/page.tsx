import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 | Cupolio",
  description: "Cupolio 서비스 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
      >
        ← 홈으로
      </Link>

      <h1 className="text-2xl font-bold text-[var(--foreground)]">이용약관</h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        시행일: 2026년 3월 6일
      </p>

      <div className="prose prose-sm mt-10 max-w-none text-[var(--foreground)] [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-[var(--foreground)] [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
        <section>
          <h2>제1조 (목적)</h2>
          <p>
            이 약관은 개인사업자 디핏(deepeet)(이하 &quot;회사&quot;)이 운영하는
            바리스타 커리어 플랫폼 Cupolio(이하 &quot;서비스&quot;)의 이용과 관련하여
            회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2>제2조 (정의)</h2>
          <ul>
            <li>
              &quot;서비스&quot;란 회사가 제공하는 바리스타 이력서·포트폴리오 관리,
              카페 채용 매칭 등 관련 온라인 서비스를 말합니다.
            </li>
            <li>
              &quot;이용자&quot;란 이 약관에 따라 회사가 제공하는 서비스를 이용하는
              회원 및 비회원을 말합니다.
            </li>
            <li>
              &quot;회원&quot;이란 회사에 개인정보를 제공하여 회원등록을 한 자로서,
              서비스를 계속적으로 이용할 수 있는 자를 말합니다.
            </li>
          </ul>
        </section>

        <section>
          <h2>제3조 (약관의 효력 및 변경)</h2>
          <p>
            이 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다. 회사는
            필요한 경우 관련 법령을 위반하지 않는 범위에서 이 약관을 변경할 수
            있으며, 변경된 약관은 서비스 내 공지 또는 전자우편 등의 방법으로
            공지함으로써 효력이 발생합니다. 이용자가 변경된 약관에 동의하지 않는
            경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.
          </p>
        </section>

        <section>
          <h2>제4조 (서비스의 제공)</h2>
          <p>
            회사는 다음과 같은 서비스를 제공합니다. 서비스의 내용은 회사의 사정에
            따라 변경·중단될 수 있으며, 이 경우 사전에 공지합니다.
          </p>
          <ul>
            <li>바리스타 프로필·이력서·포트폴리오 관리</li>
            <li>카페 채용공고 열람 및 지원</li>
            <li>바리스타와 카페 간 매칭 서비스</li>
            <li>기타 회사가 정하는 서비스</li>
          </ul>
        </section>

        <section>
          <h2>제5조 (회원가입)</h2>
          <p>
            이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에
            동의한다는 의사표시를 함으로써 회원가입을 신청합니다. 회사는 다음 각
            호에 해당하는 경우 회원가입을 거부할 수 있습니다.
          </p>
          <ul>
            <li>실명이 아니거나 타인의 정보를 도용한 경우</li>
            <li>허위 정보를 기재한 경우</li>
            <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
          </ul>
        </section>

        <section>
          <h2>제6조 (회원의 의무)</h2>
          <p>회원은 다음 행위를 하여서는 안 됩니다.</p>
          <ul>
            <li>신청 또는 변경 시 허위 내용의 등록</li>
            <li>타인의 정보 도용</li>
            <li>회사가 게시한 정보의 무단 변경</li>
            <li>회사 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
            <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
            <li>외설 또는 폭력적인 메시지, 기타 공서양속에 반하는 정보의 공개 또는 게시</li>
          </ul>
        </section>

        <section>
          <h2>제7조 (서비스 이용)</h2>
          <p>
            회사는 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간
            서비스를 제공합니다. 다만, 시스템 정기점검 등 필요한 경우 사전 공지 후
            일시적으로 서비스를 중단할 수 있습니다.
          </p>
        </section>

        <section>
          <h2>제8조 (저작권의 귀속)</h2>
          <p>
            회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속됩니다.
            이용자가 서비스 내에 게시한 게시물의 저작권은 해당 이용자에게 귀속되며,
            이용자는 회사에게 해당 게시물을 서비스 운영·홍보 등에 이용할 수 있는
            권리를 부여합니다.
          </p>
        </section>

        <section>
          <h2>제9조 (면책)</h2>
          <p>
            회사는 천재지변, 전쟁, 기타 이에 준하는 불가항력으로 인하여 서비스를
            제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다. 회사는
            이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지
            않습니다.
          </p>
        </section>

        <section>
          <h2>제10조 (분쟁해결)</h2>
          <p>
            회사와 이용자 간에 발생한 분쟁에 관한 소송은 대한민국 법을 적용하며,
            회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.
          </p>
        </section>

        <section>
          <h2>부칙</h2>
          <p>
            이 약관은 2026년 3월 6일부터 시행합니다.
          </p>
        </section>
      </div>

      <div className="mt-12 rounded-lg border border-[var(--border)] bg-[var(--muted)] p-6 text-sm">
        <h3 className="font-semibold text-[var(--foreground)]">회사 정보</h3>
        <ul className="mt-2 space-y-1 text-[var(--muted-foreground)]">
          <li>개인사업자명: 디핏(deepeet)</li>
          <li>대표자: 김건우</li>
          <li>사업자등록번호: 828-38-01303</li>
          <li>주소: 서울 마포구 양화로72 효성해링턴</li>
          <li>이메일: contact@cupolio.im</li>
        </ul>
      </div>
    </article>
  );
}
