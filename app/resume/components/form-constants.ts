export const EDUCATION_STATUS = [
  { value: "ENROLLED", label: "재학" },
  { value: "ON_LEAVE", label: "휴학" },
  { value: "GRADUATED", label: "졸업" },
  { value: "EXPECTED_GRAD", label: "졸업예정" },
  { value: "DROPPED_OUT", label: "중퇴" },
  { value: "COMPLETED", label: "수료" },
] as const;

export const EMPLOYMENT_TYPES = [
  { value: "정규직", label: "정규직" },
  { value: "계약직", label: "계약직" },
  { value: "파트타임", label: "파트타임" },
  { value: "아르바이트", label: "아르바이트" },
  { value: "인턴", label: "인턴" },
];

export const CERT_TYPES = [
  { value: "CERTIFICATION", label: "자격증" },
  { value: "AWARD", label: "수상" },
];

export const LINK_TYPES = [
  { value: "SNS", label: "SNS" },
  { value: "BLOG", label: "블로그" },
];
