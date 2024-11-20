import { useEffect, useState, useRef } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    const [isClient, setIsClient] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            if (modalRef.current) {
                const firstFocusableElement = modalRef.current.querySelector(
                    "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
                ) as HTMLElement;
                firstFocusableElement?.focus();
            }
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isClient || !isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            role="dialog"
            aria-modal="true"
            ref={modalRef}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-sm p-6 w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}