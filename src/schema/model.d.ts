// Mô hình dữ liệu của môn học
type Subject = {
  id?: number; // ID của môn học
  name: string; // Tên môn học
  config: {
    icon: string; // icon cho môn học
    color: string; // màu của icon
  };
  weight: number; // hệ số môn học
  category: string; // Phân loại môn học ["Tự chọn", "Tự nhiên", "Xã hội"]
  admissionGroups: string[]; // Nhóm môn học
};
// Các loại hình kiểm tra
type ExamType = {
  id?: number;
  name: string; // Tên bài kiểm tra
  weight: number; // hệ số bài kiểm tra
  config: {
    icon: string; // icon cho bài kiểm tra
    bgcolor: string; // màu của icon
  };
};

// Mô hình dữ liệu của mục tiêu
type Goal = {
  id?: number;
  subjectId: Subject['id'];
  examTypeId: ExamType['id'];
  targetScore: number; // số điểm môn học cơ bản
};

type Score = {
  id?: number;
  goalId?: Goal['id'];
  subjectId: Subject['id'];
  examTypeId: ExamType['id'];
  score: number;
  createdAt: Dayjs; // ngày nhập điểm
  updatedAt: Dayjs; // ngày sửa điểm
};

type Material = {
  id?: number;
  name: string; // tên file
  size: number; // kích thước file
  url: string; // đường dẫn file
  mimeType: string; // định dạng type
  subjectId: Subject['id'];
  createdAt: Dayjs;
  updatedAt: Dayjs;
};

type Schedule = {
  id?: number;
  title: string;
  subjectId: Subject['id'];
  type: string; //'Chính khoá', 'Học Thêm', 'Khác';
  startTime: Dayjs;
  endTime: Dayjs;
  recurring?: string; // Lập lại mỗi tuần hay mỗi tháng hay mỗi ngày
};

type Note = {
  id?: number;
  title: string; // tên ghi chú
  content: string; // nội dung ghi chú
  label: string; // nhóm ghi chú
  checked: boolean; // đã hoàn thành chưa
  createdAt: Dayjs;
  updatedAt: Dayjs;
};

