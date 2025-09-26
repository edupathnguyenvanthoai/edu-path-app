import type { Table } from 'dexie';

import Dexie from 'dexie';
import { type Dayjs } from 'dayjs';

import type { IconifyName } from '../components/iconify';


export interface Subject {
  id?: number; // Mã định danh duy nhất cho môn học (tự tăng)
  name: string; // Tên môn học, ví dụ: "Toán", "Lịch sử"
  color?: string; // Màu sắc đại diện cho môn học (tùy chọn)
  icon?: IconifyName; // Biểu tượng đại diện cho môn học (tùy chọn)
  category?: 'TuNhien' | 'XaHoi' | 'MonTuChon'; // Nhóm môn học: Tự nhiên, Xã hội hoặc Môn tự chọn
  createdAt: Dayjs; // Ngày tạo hoặc thêm môn học vào cơ sở dữ liệu
}

export const SUBJECT_CATEGORIES = ['MonTuChon', 'TuNhien', 'XaHoi'] as const;

export interface Goal {
  id?: number; // Mã định danh duy nhất cho mục tiêu (tự tăng)
  subjectId: Subject['id']; // Tham chiếu đến môn học liên quan đến mục tiêu này
  examType: 'GiuaKy' | 'CuoiKy' | 'ThiThu' | 'ThiTHPT'; // Loại kỳ thi: Giữa kỳ, Cuối kỳ, Thi thử, hoặc Thi THPT Quốc gia
  targetScore: number; // Điểm mong muốn đạt được cho loại kỳ thi này
}

export interface StudyPlan {
  id?: number; // Mã định danh duy nhất cho kế hoạch học tập (tự tăng)
  subjectId: Subject['id']; // Tham chiếu đến môn học mà kế hoạch này thuộc về
  week: number; // Tuần áp dụng cho kế hoạch này
  sessionsPerWeek: number; // Số buổi học dự kiến trong tuần
  exercisesPerWeek: number; // Số bài tập dự kiến trong tuần
  hoursPerWeek: number; // Tổng số giờ học dự kiến trong tuần
}

export interface Progress {
  id?: number; // Mã định danh duy nhất cho bản ghi tiến độ (tự tăng)
  subjectId: Subject['id']; // Tham chiếu đến môn học mà tiến độ này thuộc về
  date: Dayjs; // Ngày ghi nhận tiến độ
  hoursStudied: number; // Số giờ đã học trong ngày này
  exercisesDone: number; // Số bài tập đã hoàn thành trong ngày này
}

export interface Score {
  id?: number; // Mã định danh duy nhất cho điểm số (tự tăng)
  subjectId: Subject['id']; // Tham chiếu đến môn học mà điểm số này thuộc về
  type: 'Mieng' | '15p' | '1Tiet' | 'HocKy'; // Loại bài kiểm tra: Miệng, 15 phút, 1 tiết, hoặc Học kỳ
  score: number; // Điểm số đạt được
  date: Date; // Ngày ghi nhận điểm số
}

export interface Schedule {
  id?: number; // Mã định danh duy nhất cho lịch trình (tự tăng)
  title: string; // Tiêu đề hoặc tên sự kiện trong lịch
  type: 'ChinhKhoa' | 'HocThem' | 'Other'; // Loại sự kiện: Chính khóa, Học thêm hoặc Khác
  startTime: Date; // Thời gian bắt đầu sự kiện
  endTime: Date; // Thời gian kết thúc sự kiện
  recurring?: string; // Mẫu lặp lại, ví dụ: 'hàng tuần', 'hàng ngày'
}

export interface Material {
  id?: number; // Mã định danh duy nhất cho tài liệu (tự tăng)
  subjectId: Subject['id']; // Tham chiếu đến môn học mà tài liệu này thuộc về
  type: 'PDF' | 'Image' | 'Video'; // Loại tài liệu: PDF, Hình ảnh hoặc Video
  title: string; // Tiêu đề hoặc mô tả tài liệu
  url: string; // Đường dẫn hoặc liên kết đến tài liệu
}

export interface Habit {
  id?: number; // Mã định danh duy nhất cho thói quen (tự tăng)
  date: Dayjs; // Ngày theo dõi thói quen
  totalHours: number; // Tổng số giờ dành cho thói quen học tập trong ngày
  notes?: string; // Ghi chú hoặc nhận xét tùy chọn cho ngày đó
}

export interface SocialActivity {
  id?: number; // Mã định danh duy nhất cho hoạt động xã hội (tự tăng)
  type: 'ChatGroup' | 'ShareProgress' | 'Forum' | 'TeacherConnect'; // Loại hoạt động xã hội: Nhóm chat, Chia sẻ tiến độ, Diễn đàn hoặc Kết nối giáo viên
  relatedSubjectId?: number; // Tham chiếu tùy chọn đến môn học liên quan
  content: string; // Nội dung hoặc tin nhắn của hoạt động
  date: Date; // Ngày diễn ra hoạt động
}

export interface Achievement {
  id?: number; // Mã định danh duy nhất cho thành tích (tự tăng)
  name: string; // Tên hoặc tiêu đề thành tích
  description: string; // Mô tả hoặc chi tiết về thành tích
  dateEarned: Date; // Ngày đạt được thành tích
}

export interface Challenge {
  id?: number; // Mã định danh duy nhất cho thử thách (tự tăng)
  name: string; // Tên hoặc tiêu đề thử thách
  description: string; // Mô tả hoặc chi tiết về thử thách
  targetExercises: number; // Số bài tập cần hoàn thành trong thử thách
  targetHours: number; // Số giờ cần dành cho thử thách
  week: number; // Tuần áp dụng thử thách
  status: 'Pending' | 'Completed'; // Trạng thái hiện tại của thử thách
}

// Database
export class AppDB extends Dexie {
  // Bảng lưu thông tin các môn học
  subjects!: Table<Subject, number>;
  // Bảng lưu các mục tiêu học tập theo môn và loại kỳ thi
  goals!: Table<Goal, number>;
  // Bảng lưu kế hoạch học tập theo tuần và môn học
  studyPlans!: Table<StudyPlan, number>;
  // Bảng ghi nhận tiến độ học tập hàng ngày theo môn
  progress!: Table<Progress, number>;
  // Bảng lưu điểm số các bài kiểm tra theo môn và loại bài kiểm tra
  scores!: Table<Score, number>;
  // Bảng quản lý lịch trình các sự kiện học tập
  schedules!: Table<Schedule, number>;
  // Bảng lưu tài liệu học tập theo môn và loại tài liệu
  materials!: Table<Material, number>;
  // Bảng theo dõi thói quen học tập hàng ngày
  habits!: Table<Habit, number>;
  // Bảng ghi nhận các hoạt động xã hội liên quan đến học tập
  socialActivities!: Table<SocialActivity, number>;
  // Bảng lưu các thành tích đạt được trong quá trình học tập
  achievements!: Table<Achievement, number>;
  // Bảng quản lý các thử thách học tập theo tuần
  challenges!: Table<Challenge, number>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      subjects: '++id,name,category',
      goals: '++id,subjectId,examType',
      studyPlans: '++id,subjectId,week',
      progress: '++id,subjectId,date',
      scores: '++id,subjectId,type,date',
      schedules: '++id,title,startTime,endTime,recurring',
      materials: '++id,subjectId,type,title',
      habits: '++id,date',
      socialActivities: '++id,type,relatedSubjectId,date',
      achievements: '++id,name,dateEarned',
      challenges: '++id,name,week,status',
    });
  }
}

export const db = new AppDB();
