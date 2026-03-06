import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | Cupolio",
  description: "Cupolio 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
      >
        ← 홈으로
      </Link>

      <h1 className="text-2xl font-bold text-[var(--foreground)]">
        개인정보처리방침
      </h1>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        시행일: 2026년 3월 6일
      </p>

      <div className="prose prose-sm mt-10 max-w-none text-[var(--foreground)] [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-[var(--foreground)] [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
        <section>
          <h2>제1조 (개인정보의 수집 및 이용 목적)</h2>
          <p>
            개인사업자 디핏(deepeet)(이하 &quot;회사&quot;)은 다음의 목적을 위하여
            개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
            용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를
            받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul>
            <li>회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공, 본인 확인</li>
            <li>서비스 제공: 이력서·포트폴리오 관리, 채용 매칭 서비스 제공</li>
            <li>고충처리: 민원인의 신원 확인, 민원사항 확인 및 처리 결과 통보</li>
          </ul>
        </section>

        <section>
          <h2>제2조 (수집하는 개인정보의 항목)</h2>
          <p>회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
          <ul>
            <li>
              <strong>필수항목:</strong> 이메일 주소, 이름(닉네임), 프로필 사진
              (Google 로그인 시 제공되는 정보)
            </li>
            <li>
              <strong>선택항목:</strong> 경력, 자격증, 포트폴리오 등 이용자가
              직접 입력하는 정보
            </li>
            <li>
              <strong>자동 수집 항목:</strong> IP 주소, 쿠키, 서비스 이용 기록,
              접속 로그
            </li>
          </ul>
        </section>

        <section>
          <h2>제3조 (개인정보의 보유 및 이용 기간)</h2>
          <p>
            회사는 법령에 따른 개인정보 보유·이용기간 또는 이용자로부터 개인정보를
            수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <ul>
            <li>회원 탈퇴 시: 탈퇴 요청일로부터 지체 없이 파기 (단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관)</li>
            <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
            <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
            <li>웹사이트 방문 기록: 3개월 (통신비밀보호법)</li>
          </ul>
        </section>

        <section>
          <h2>제4조 (개인정보의 제3자 제공)</h2>
          <p>
            회사는 이용자의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며,
            이용자의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에
            해당하는 경우에만 제3자에게 제공합니다.
          </p>
        </section>

        <section>
          <h2>제5조 (개인정보 처리의 위탁)</h2>
          <p>
            회사는 원활한 서비스 제공을 위해 다음과 같이 개인정보 처리업무를
            위탁하고 있습니다.
          </p>
          <ul>
            <li>
              <strong>Supabase:</strong> 회원 인증, 데이터 저장 (미국)
            </li>
            <li>
              <strong>Google:</strong> 소셜 로그인 (Google OAuth)
            </li>
          </ul>
          <p className="mt-3">
            위탁받은 업체가 관련 법령을 준수하는지 관리·감독하고 있습니다.
          </p>
        </section>

        <section>
          <h2>제6조 (이용자의 권리)</h2>
          <p>이용자는 다음과 같은 권리를 행사할 수 있습니다.</p>
          <ul>
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리 정지 요구</li>
          </ul>
          <p className="mt-3">
            권리 행사는 회사에 서면, 전화, 이메일 등을 통하여 하실 수 있으며,
            회사는 이에 대해 지체 없이 조치하겠습니다.
          </p>
        </section>

        <section>
          <h2>제7조 (개인정보의 파기)</h2>
          <p>
            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게
            되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 파기 절차 및 방법은
            다음과 같습니다.
          </p>
          <ul>
            <li>전자적 파일: 복구 및 재생되지 않도록 기술적 방법을 이용하여 완전히 삭제</li>
            <li>종이 문서: 분쇄기로 분쇄하거나 소각</li>
          </ul>
        </section>

        <section>
          <h2>제8조 (개인정보의 안전성 확보 조치)</h2>
          <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
          <ul>
            <li>개인정보 취급 직원의 최소화 및 교육</li>
            <li>개인정보에 대한 접근 제한</li>
            <li>해킹 등에 대비한 기술적 대책</li>
            <li>개인정보의 암호화</li>
          </ul>
        </section>

        <section>
          <h2>제9조 (개인정보 보호책임자)</h2>
          <p>
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
            관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이
            개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <ul>
            <li>개인정보 보호책임자: 김건우</li>
            <li>연락처: contact@cupolio.im</li>
          </ul>
        </section>

        <section>
          <h2>제10조 (개인정보처리방침의 변경)</h2>
          <p>
            이 개인정보처리방침은 2026년 3월 6일부터 적용됩니다. 법령 및 방침에 따른
            변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터
            공지사항을 통하여 고지할 것입니다.
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
          <li>개인정보 보호책임자: 김건우 (contact@cupolio.im)</li>
        </ul>
      </div>
    </article>
  );
}
