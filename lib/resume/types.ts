export type EducationStatus =
  | "ENROLLED"
  | "ON_LEAVE"
  | "GRADUATED"
  | "EXPECTED_GRAD"
  | "DROPPED_OUT"
  | "COMPLETED";

export type CertificationAwardType = "CERTIFICATION" | "AWARD";

export type LinkType = "SNS" | "BLOG";

export interface Member {
  id: number;
  uid: string;
  email: string;
  profile_image_url: string;
}

export interface Resume {
  id: number;
  cid: string;
  member_id: number;
  visibility: number;
  location: string;
}

export interface WorkExperience {
  id: number;
  resume_id: number;
  name: string;
  position: string;
  start_date: string;
  end_date: string | null;
  employed: number;
  performances?: Performance[];
}

export interface Performance {
  id: number;
  work_experience_id: number;
  description: string | null;
}

export interface Education {
  id: number;
  resume_id: number;
  name: string;
  major: string | null;
  start_date: string;
  end_date: string | null;
  status: EducationStatus;
}

export interface Activity {
  id: number;
  resume_id: number;
  name: string;
  description: string | null;
  finished: number;
  start_date: string;
  end_date: string | null;
}

export interface CertificationAward {
  id: number;
  resume_id: number;
  name: string;
  organization: string | null;
  date: string | null;
  description: string;
  type: CertificationAwardType;
}

export interface Skill {
  id: number;
  name: string;
}

export interface Preference {
  id: number;
  resume_id: number;
  desired_job: string;
  desired_location: string;
  employment_type: string;
}

export interface Link {
  id: number;
  resume_id: number;
  url: string;
  type: LinkType;
}

export interface Introduction {
  id: number;
  resume_id: number;
  description: string | null;
}

export interface ResumeLanguage {
  name: string;
  description: string | null;
}

export interface ResumeWithRelations extends Resume {
  member?: Member;
  work_experiences?: WorkExperience[];
  educations?: Education[];
  activities?: Activity[];
  certification_awards?: CertificationAward[];
  skills?: Skill[];
  preference?: Preference;
  links?: Link[];
  introduction?: Introduction;
  resume_languages?: ResumeLanguage[];
}
