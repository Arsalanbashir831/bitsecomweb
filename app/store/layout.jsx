import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "Store dashboard",
    robots: { index: false, follow: false },
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
