interface IBlog {
    id: number;
    content: string;
    title: string;
    author: string;
    category: string[];
}

interface ICategory {
    id: number;
    name: string;
    image: string;
}
interface ICategoryProps {
    categories: ICategory[]
}

interface ModalCategoryProps {
    show: boolean;
    onHide: () => void;
    isUpdate: boolean;
    category: ICategory | null;
    setCategory: (value: ICategory | null) => void;
}

interface ModalProps {
    show: boolean;
    onHide: () => void;
    isUpdate: boolean;
    blog: IBlog | null;
    setBlog: (value: IBlog | null) => void;
}

interface IProps {
    blogs: IBlog[]
}

interface AuthContextData {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}