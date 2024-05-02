import Home from '@icons/mobile/appbar/home.svg';
import MentorPage from '@icons/mobile/appbar/mentor-page.svg';
import MenteeCenter from '@icons/mobile/appbar/mentee-center.svg';
import MyInfo from '@icons/mobile/appbar/my-info.svg';
import { RedirectRoutes } from './types/redirect';

export const HOMEPAGE_URL =
  'http://codi-frontend.s3-website-ap-northeast-1.amazonaws.com/';

export const DROPDOWN_RESET_CATEGORY = "전체"

export const DISABILITIES = [
  '지체장애',
  '언어장애',
  '간장애',
  '뇌병변장애',
  '안면장애',
  '호흡기장애',
  '자폐성장애',
  '시각장애',
  '신장장애',
  '장루/요루장애',
  '정신장애',
  '청각장애',
  '심장장애',
  '뇌전증장애',
];
export const SEVERITIES = ['중증', '경증'];

export const CATEGORIZED_JOBS = [
  {
    category: '사무・행정',
    jobs: [
      '경영・기획',
      '영업・제휴',
      '서비스・고객지원',
      '인사・총무',
      '마케팅・광고',
      '금융',
      '공공・복지'
    ],
  },

  {
    category: '기술・연구',
    jobs: [
      'IT개발・데이터',
      '엔지니어링・연구・R&D',
      '의료・바이오・제약'
    ],
  },
  {
    category: '건설・생산・운송',
    jobs: ['건설・건축,',
      '생산・제조',
      '운전・운송',
      '유통・무역',
      '농림・어업직'],
  },
  {
    category: '문화・디자인・전문직',
    jobs: ['미디어・문화・스포츠',
      '디자인',
      '법률・법무',
      '전문・특수',
      '교육']
  },

];

export const JOBS = [
  '건설/채굴 연구개발직 및 공학기술직',

  '경호/경비직',

  '교육직',

  '농림어업직',
  '돌봄 서비스직(간병/육아)',
  '미용/예식 서비스직',

  '보건의료직',
  '사회복지/종교직',

  '스포츠/레크리에이션직',

  '여행/숙박/오락 서비스직',
  '영업/판매직',
  '예술/디자인/방송직',
  '운전/운송직',
  '음식 서비스직',
  '인문/사회과학 연구직',

  '자연/생명과학 연구직',

  '정보통신 설치/정비직',
  '정보통신 연구개발직 및 공학기술직',

  '제조 연구개발직 및 공학기술직',
  '청소 및 기타 개인서비스직',
];
export const ImagePath =
  'https://codi-frontend.s3.ap-northeast-1.amazonaws.com/images';

export const CAREERS = ['1 ~ 4년 차', '5 ~ 8년 차', '9 ~ 12년 차', '13년 이상'];

export const DATE = {
  YEARS: [
    1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981,
    1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993,
    1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005
  ],
  MONTHS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  DAYS: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ],
};

export const PROFILE_MENU = (isUser: boolean) => {
  return [
    {
      name: `${isUser ? '내 프로필' : '프로필 작성하기'}`,
      href: `${isUser ? '/menteeCenter' : 'profileForm'}`,
    },
    {
      name: '비밀번호 수정',
      href: '/updateMyInfo',
    },
    {
      name: '로그아웃',
      href: '',
    },
  ];
};

export const SCHEDULE_TIME_TABLE = [
  '06:00 - 06:50',
  '07:00 - 07:50',
  '08:00 - 08:50',
  '09:00 - 09:50',
  '10:00 - 10:50',
  '11:00 - 11:50',
  '12:00 - 12:50',
  '13:00 - 13:50',
  '14:00 - 14:50',
  '15:00 - 15:50',
  '16:00 - 16:50',
  '17:00 - 17:50',
  '18:00 - 18:50',
  '19:00 - 19:50',
  '20:00 - 20:50',
  '21:00 - 21:50',
  '22:00 - 22:50',
  '23:00 - 23:50',
];

export const EMPLOYMENT_STATUSES = [
  '학생',
  '취업 준비생',
  '재직중',
  '이직 준비중',
  '표시하지 않음(멘티로 표시)',
];

export const EMPLOYMENT_STATUSES_VALUE = new Map();
EMPLOYMENT_STATUSES_VALUE.set('학생', 'STUDENT');
EMPLOYMENT_STATUSES_VALUE.set('취업 준비생', 'JOBSEEKER');
EMPLOYMENT_STATUSES_VALUE.set('재직중', 'EMPLOYED');
EMPLOYMENT_STATUSES_VALUE.set('이직 준비중', 'PREPARINGCHANGEJOB');
EMPLOYMENT_STATUSES_VALUE.set('표시하지 않음(멘티로 표시)', 'MENTEE');

export const STALE_TIME = {
  VERY_OFTEN: 1 * 1000,
  OFTEN: 10 * 1000,
  SOMETIMES: 60 * 1000,
  SELDOM: 600 * 1000,
};

export const MOBILE_NAVIGATION_HEIGHT = 128;

export const APPBAR_NOT_SHOWING_PAGES = [
  '/signin',
  '/account/findId',
  '/account/findPw',
];

export const MOBILE_NAVIGATIONS = [
  {
    icon: Home,
    text: '홈',
    link: '/',
  },
  {
    icon: MentorPage,
    text: '멘토 찾기',
    link: '/mentorsMain',
  },
  {
    icon: MenteeCenter,
    text: '멘티 센터',
    link: '/menteeCenter',
  },
  {
    icon: MyInfo,
    text: '멘토센터',
    link: '/mentorCenter',
  },
];

export const MAXIMUM_FILE_SIZE = 10 * 1024 * 1024;

export const REDIRECT_ROUTES: RedirectRoutes[] = [
  {
    currentRoute: '/mentorRegisterForm',
    redirectRoute: '/signin',
    allowed: 'user',
    message: '로그인이 필요해요. 로그인 페이지로 이동하시겠습니까?',
  },
  {
    currentRoute: '/profileForm',
    redirectRoute: '/signin',
    allowed: 'user',
    message: '로그인이 필요해요. 로그인 페이지로 이동하시겠습니까?',
  },
  {
    currentRoute: '/mentoringApplyForm',
    redirectRoute: '/signin',
    allowed: 'user',
    message: '로그인이 필요해요. 로그인 페이지로 이동하시겠습니까?',
  },
  {
    currentRoute: '/mentorRegisterForm',
    redirectRoute: '/profileForm',
    allowed: 'profile',
    message: '프로필 작성이 필요해요. 프로필 작성 페이지로 이동하시겠습니까?',
  },
  {
    currentRoute: '/mentoringApplyForm',
    redirectRoute: '/profileForm',
    allowed: 'profile',
    message: '프로필 작성이 필요해요. 프로필 작성 페이지로 이동하시겠습니까?',
  },
  {
    currentRoute: '/menteeCenter',
    redirectRoute: '/signin',
    allowed: 'user',
    message: '로그인이 필요해요. 로그인 페이지로 이동하시겠습니까?',
  },
];