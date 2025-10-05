import React from 'react';
import type { PromptData } from './types';
import { MusicNoteIcon, MicrophoneIcon, GuitarIcon, DiscIcon, DrumIcon, SpecialIcon, LanguageIcon } from './components/icons';

// Constants for Lyrics Generator (aimusic-l)
export const INITIAL_GENRES: string[] = [
  "K-발라드",
  "K-인디",
  "K-트로트",
  "힙합",
  "댄스",
  "R&B",
  "락",
  "시티팝",
];

export const COUPANG_LINKS: string[] = [
  "https://link.coupang.com/a/bY9Lao",
  "https://link.coupang.com/a/bY9L4H",
  "https://link.coupang.com/a/bY9Mgn",
];

export const ADMIN_CREDENTIALS = {
  username: "akb0811",
  password: "rlqja0985!",
};

// Constants for Thumbnail Generator (aimusic-i)
export const PROMPT_DATA: PromptData = {
  "장르": [
    { name: "대중음악", tags: [
      { label: "K-pop", value: "K-pop" }, { label: "J-pop", value: "J-pop" }, { label: "팝", value: "Pop" }, { label: "신스팝", value: "Synth-pop" }, { label: "일렉트로팝", value: "Electropop" }, { label: "시티팝", value: "City Pop" }, { label: "댄스팝", value: "Dance-pop" }, { label: "버블검팝", value: "Bubblegum Pop" }
    ] },
    { name: "발라드", tags: [
      { label: "K-발라드", value: "K-Ballad" },
      { label: "팝 발라드", value: "Pop Ballad" },
      { label: "락 발라드", value: "Rock Ballad" },
      { label: "R&B 발라드", value: "R&B Ballad" },
      { label: "파워 발라드", value: "Power Ballad" },
    ] },
    { name: "힙합", tags: [
      { label: "붐뱁", value: "Boom Bap" }, { label: "트랩", value: "Trap" }, { label: "드릴", value: "Drill" }, { label: "로파이 힙합", value: "Lo-fi Hip-Hop" }, { label: "멈블랩", value: "Mumble Rap" }, { label: "올드스쿨 랩", value: "Old School Rap" }, { label: "이모셔널 랩", value: "Emotional Rap" }
    ] },
    { name: "락", tags: [
      { label: "얼터너티브 락", value: "Alternative Rock" }, { label: "인디 락", value: "Indie Rock" }, { label: "포스트 락", value: "Post-Rock" }, { label: "그런지", value: "Grunge" }, { label: "뉴메탈", value: "Nu-metal" }, { label: "펑크 락", value: "Punk Rock" }, { label: "서프 락", value: "Surf rock" }
    ] },
    { name: "일렉트로닉", tags: [
      { label: "EDM", value: "EDM" }, { label: "하우스", value: "House" }, { label: "테크노", value: "Techno" }, { label: "트랜스", value: "Trance" }, { label: "덥스텝", value: "Dubstep" }, { label: "저지 클럽", value: "Jersey Club" }, { label: "브레이크비트", value: "Breakbeat" }, { label: "글리치", value: "Glitch" }, { label: "IDM", value: "IDM" }, { label: "일렉트로 스윙", value: "Electro Swing" }
    ] },
    { name: "R&B / 소울", tags: [
      { label: "컨템포러리 R&B", value: "Contemporary R&B" }, { label: "네오 소울", value: "Neo-Soul" }, { label: "90년대 R&B", value: "90s R&B" }, { label: "트랩 소울", value: "Trap-soul" }, { label: "슬로우잼", value: "Slow Jam" }, { label: "펑크", value: "Funk" }
    ] },
    { name: "재즈 / 블루스", tags: [
      { label: "재즈", value: "Jazz" }, { label: "블루스", value: "Blues" }, { label: "스윙", value: "Swing" }, { label: "소울 재즈", value: "Soul Jazz" }, { label: "비밥", value: "Bebop" }
    ] },
    { name: "월드 뮤직", tags: [
      { label: "레게", value: "Reggae" }, { label: "라틴", value: "Latin" }, { label: "아프로비트", value: "Afrobeat" }, { label: "칼립소", value: "Calypso" }, { label: "클레즈머", value: "Klezmer" }, { label: "삼바", value: "Samba" }, { label: "보사노바", value: "Bossa Nova" }, { label: "포크", value: "Folk" }
    ] },
    { name: "트로트", tags: [
      { label: "전통 트로트", value: "Traditional Trot" },
      { label: "세미 트로트", value: "Semi Trot" },
      { label: "댄스 트로트", value: "Dance Trot" },
    ] }
  ],
  "분위기": [
    { name: "감정", tags: [
      { label: "경쾌한", value: "Uplifting" }, { label: "우울한", value: "Melancholic" }, { label: "로맨틱한", value: "Romantic" }, { label: "평화로운", value: "Peaceful" }, { label: "에너제틱한", value: "Energetic" }, { label: "공격적인", value: "Aggressive" }, { label: "몽환적인", value: "Dreamy" }, { label: "관능적인", value: "Sensual" }, { label: "으스스한", value: "Haunting" }, { label: "어두운", value: "Gloomy" }, { label: "장난스러운", value: "Playful" }, { label: "향수를 자극하는", value: "Nostalgic" }
    ] },
    { name: "테마", tags: [
      { label: "영화적인", value: "Cinematic" }, { label: "웅장한", value: "Epic" }, { label: "미래적인", value: "Futuristic" }, { label: "레트로", value: "Retro" }, { label: "트로피컬", value: "Tropical" }, { label: "도시적인", value: "Urban" }, { label: "디스토피아적인", value: "Dystopian" }, { label: "신비로운", value: "Mysterious" }, { label: "전쟁같은", value: "Warlike" }, { label: "장엄한", value: "Grandiose" }, { label: "판타지", value: "Fantasy" }, { label: "공상과학", value: "Sci-fi" }
    ] }
  ],
  "악기": [
    { name: "건반", tags: [
      { label: "어쿠스틱 피아노", value: "Acoustic Piano" }, { label: "일렉트릭 피아노", value: "Electric Piano" }, { label: "신스 패드", value: "Synth Pads" }, { label: "오르간", value: "Organ" }, { label: "하프시코드", value: "Harpsichord" }, { label: "아코디언", value: "Accordion" }
    ] },
    { name: "기타", tags: [
      { label: "어쿠스틱 기타", value: "Acoustic Guitar" }, { label: "일렉트릭 기타", value: "Electric Guitar" }, { label: "디스토션 기타", value: "Distorted Guitar" }, { label: "쟁글 기타", value: "Jangly Guitar" }, { label: "트왕 기타", value: "Twangy Guitar" }, { label: "리버브 기타", value: "Reverb-heavy guitar" }
    ] },
    { name: "베이스", tags: [
      { label: "일렉트릭 베이스", value: "Electric Bass" }, { label: "신스 베이스", value: "Synth Bass" }, { label: "808 베이스", value: "808 Bass" }, { label: "업라이트 베이스", value: "Upright Bass" }, { label: "워블 베이스", value: "Wobble Bass" }, { label: "헤비 베이스", value: "Heavy Bass" }
    ] },
    { name: "드럼 & 퍼커션", tags: [
      { label: "어쿠스틱 드럼", value: "Acoustic Drums" }, { label: "드럼 머신", value: "Drum Machine" }, { label: "브레이크비트", value: "Breakbeat" }, { label: "하이햇 롤", value: "Hi-hat Rolls" }, { label: "드럼 필", value: "Drum Fills" }, { label: "팀파니", value: "Timpani" }, { label: "스틸 드럼", value: "Steel Drums" }, { label: "워시보드", value: "Washboard" }
    ] },
    { name: "오케스트라", tags: [
      { label: "스트링", value: "Strings" }, { label: "바이올린", value: "Violin" }, { label: "첼로", value: "Cello" }, { label: "브라스 섹션", value: "Brass Section" }, { label: "호른", value: "Horns" }, { label: "트럼펫", value: "Trumpet" }, { label: "목관악기", value: "Woodwinds" }, { label: "플루트", value: "Flute" }, { label: "오케스트라", value: "Orchestral" }
    ] },
    { name: "민속 악기", tags: [
      { label: "샤미센", value: "Shamisen" }, { label: "시타르", value: "Sitar" }, { label: "우쿨렐레", value: "Ukulele" }, { label: "하모니카", value: "Harmonica" }, { label: "만돌린", value: "Mandolin" }, { label: "밴조", value: "Banjo" }
    ] }
  ],
  "보컬": [
    { name: "보컬 타입", tags: [
      { label: "남성 보컬", value: "Male Vocal" }, { label: "여성 보컬", value: "Female Vocal" }, { label: "남성 랩", value: "Male Rap" }, { label: "여성 랩", value: "Female Rap" }, { label: "합창", value: "Choir" }, { label: "남성 합창", value: "Male Choir" }, { label: "어린이 보컬", value: "Child Vocal" }, { label: "혼성 보컬", value: "Mixed Voices" }
    ] },
    { name: "보컬 스타일", tags: [
      { label: "소울풀한 보컬", value: "Soulful Vocals" }, { label: "부드러운 보컬", value: "Smooth Vocals" }, { label: "공격적인 랩", value: "Aggressive Rap" }, { label: "멜로딕 랩", value: "Melodic Rap" }, { label: "팔세토", value: "Falsetto" }, { label: "벨팅", value: "Belting" }, { label: "성악", value: "Operatic Vocals" }, { label: "뮤지컬", value: "Musical Theatre Vocals" }, { label: "속삭이는 보컬", value: "Whispering" }, { label: "하모니", value: "Harmonies" }, { label: "요들", value: "Yodeling" }, { label: "고대 성가", value: "Ancient Chants" }, { label: "스크리밍", value: "Scream" }
    ] },
    { name: "보컬 효과", tags: [
      { label: "보코더", value: "Vocoder" }, { label: "오토튠", value: "Autotune" }, { label: "리버브 보컬", value: "Reverb-heavy Vocals" }, { label: "애드립", value: "Ad-libs" }, { label: "에코 보컬", value: "Echoing Vocals" }
    ] }
  ],
  "언어": [
    { name: "가사 언어", tags: [
      { label: "한국어", value: "Korean" }, { label: "영어", value: "English" }, { label: "일본어", value: "Japanese" }, { label: "중국어", value: "Chinese" }, { label: "스페인어", value: "Spanish" }, { label: "프랑스어", value: "French" }, { label: "독일어", value: "German" }, { label: "연주곡", value: "Instrumental" }
    ] }
  ],
  "템포": [
    { name: "BPM", tags: [
      { label: "느린 템포 (60-80 BPM)", value: "Slow Tempo (60-80 BPM)" }, { label: "중간 템포 (80-110 BPM)", value: "Mid Tempo (80-110 BPM)" }, { label: "업비트 (110-140 BPM)", value: "Upbeat (110-140 BPM)" }, { label: "빠른 템포 (140-180 BPM)", value: "Fast Tempo (140-180 BPM)" }, { label: "아주 빠른 템포 (180+ BPM)", value: "Very Fast Tempo (180+ BPM)" }
    ] },
    { name: "리듬", tags: [
      { label: "그루비한", value: "Groovy" }, { label: "싱코페이션", value: "Syncopated" }, { label: "드라이빙 리듬", value: "Driving Rhythm" }, { label: "리드미컬한", value: "Rhythmic" }, { label: "느긋한", value: "Laid-back" }, { label: "오프비트", value: "Off-beat" }, { label: "폴리리듬", value: "Polyrhythmic" }
    ] }
  ],
  "시대 & 스타일": [
    { name: "시대별", tags: [
      { label: "1960년대 스타일", value: "1960s style" }, { label: "1970년대 스타일", value: "1970s style" }, { label: "1980년대 스타일", value: "1980s style" }, { label: "1990년대 스타일", value: "1990s style" }, { label: "2000년대 스타일", value: "2000s style" }, { label: "2010년대 스타일", value: "2010s style" }
    ] },
    { name: "제작 스타일", tags: [
      { label: "로파이", value: "Lo-fi" }, { label: "하이파이", value: "Hi-fi" }, { label: "미니멀리즘", value: "Minimalistic" }, { label: "다이나믹 레이어링", value: "Dynamic Layering" }, { label: "날것의", value: "Raw" }, { label: "세련된", value: "Polished" }, { label: "분위기 있는", value: "Atmospheric" }, { label: "DIY 감성", value: "DIY aesthetic" }, { label: "바이닐 노이즈", value: "Vinyl Crackle" }, { label: "샘플 기반", value: "Sample-based" }
    ] }
  ]
};

export const GENRE_ICONS: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  "장르": MusicNoteIcon,
  "분위기": SpecialIcon,
  "악기": GuitarIcon,
  "보컬": MicrophoneIcon,
  "언어": LanguageIcon,
  "템포": DrumIcon,
  "시대 & 스타일": DiscIcon,
};
