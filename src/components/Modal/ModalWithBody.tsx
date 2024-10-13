import React, {Fragment, ReactNode, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import SuccessBadge from '../Badge/SuccessBadge';
import WarningBadge from '../Badge/WarningBadge';
import DangerBadge from '../Badge/DangerBadge';
import SecondaryBadge from '../Badge/SecondaryBadge';

interface Props {
  open: boolean,
  setOpen: (open: boolean) => void,
  title?: string,
  bigScreenWidth: string,
  badge?: {
    label: string,
    type: "Success" | "Warning" | "Danger" | "Secondary",
  },
  children: ReactNode,
}

const ModalWithBody: React.FC<Props> = ({open, setOpen, title, bigScreenWidth, badge, children}) => {
  const cancelButtonRef = useRef(null);

  const renderBadge = (label: string, type: string) => {
    switch (type) {
      case "Success":
        return <SuccessBadge label={label}/>;
      case "Warning":
        return <WarningBadge label={label}/>;
      case "Danger":
        return <DangerBadge label={label}/>;
      default:
        return <SecondaryBadge label={label}/>;
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 w-full" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-full overflow-y-auto">
          <div className="flex min-h-full w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left
              shadow-xl transition-all sm:my-8 sm:p-6 max-w-${bigScreenWidth}`}>
                {(title || badge) && <Dialog.Title as="h3" className="flex flex-row justify-between items-center gap-2
                text-base font-semibold leading-6 text-center text-gray-900">
                  {title && <span>{title}</span>}
                  {badge && renderBadge(badge.label, badge.type)}
                </Dialog.Title>}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ModalWithBody;
