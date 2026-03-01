import { Menu, Transition } from "@headlessui/react";
import { Fragment, type ReactNode } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface MenuItem {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

interface ActionMenuProps {
  items: MenuItem[];
}

const ActionMenu = ({ items }: ActionMenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#705295] text-white hover:opacity-90 transition-opacity focus:outline-none">
        <HiOutlineDotsHorizontal size={20} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-[160px] origin-top-right rounded-[12px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.1)] focus:outline-none z-50 p-1.5 border-none">
          {items.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  onClick={item.onClick}
                  className={`group flex w-full items-center rounded-[8px] px-3 py-2 text-[14px] font-medium transition-colors gap-3 ${
                    active ? "bg-[#F2EFFF] text-[#705295]" : "text-[#71717A]"
                  }`}
                >
                  <span
                    className={active ? "text-[#705295]" : "text-[#71717A]"}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ActionMenu;
