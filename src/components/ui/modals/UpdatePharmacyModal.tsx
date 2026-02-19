import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineSearch } from "react-icons/hi";
import DataTable from "react-data-table-component";
import Modal from "./Modal";
import Heading from "../../../components/ui/headings/Heading";
import Pagination from "../../../components/ui/table/Pagination";
import InputField from "../inputs/InputField";
import { commonTableStyles } from "../../../components/ui/table/TableStyles";
import {
  PHARMACY_COLUMNS,
  PHARMACY_DUMMY_DATA,
} from "../../../constants/commonData";

interface UpdatePharmacyProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdatePharmacyModal = ({ isOpen, onClose }: UpdatePharmacyProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      searchPharmacy: "",
    },
  });

  const onSubmit = (data: any) => {
    const loadToast = toast.loading("Updating pharmacy information...");
    setTimeout(() => {
      toast.success("Pharmacy updated successfully!", { id: loadToast });
      onClose();
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Pharmacy"
      width="max-w-[1100px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-[#A3948C] text-[16px] font-medium">
          Current: <span className="text-[#271100]">QS/1 PA TEST PHARMACY</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="relative">
              <InputField
                label="Search Pharmacy"
                name="searchPharmacy"
                control={control}
                type="text"
                placeholder="By name, state & zip-code"
                className="!gap-1"
              />
              <HiOutlineSearch
                className="absolute right-4 top-[42px] text-gray-400"
                size={22}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-medium text-[#000000]">
                Selected Pharmacy
              </label>
              <div className="bg-[#E8F8F0] p-6 rounded-[25px] border border-[#27C273]/10 space-y-3">
                <p className="text-[#27C273] font-bold text-[16px] flex items-center gap-2">
                  <span className="text-[20px]">🌿</span> Pharmacy:
                  <span className="text-[#271100]"> ABC Hawaii Pharmacy.</span>
                </p>
                <div className="space-y-2 text-[14px] text-[#271100] font-medium">
                  <p>
                    <span className="text-[#A3948C]">Address:</span> 72 Caisson
                    Trace, AL 36527, USA
                  </p>
                  <p>
                    <span className="text-[#A3948C]">Phone #:</span> (876) 456
                    3476
                  </p>
                  <p>
                    <span className="text-[#A3948C]">Fax #:</span> (876) 456
                    3476
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[25px] overflow-hidden border border-[#D4CFCC] h-[340px] shadow-sm">
            <img
              src="https://picsum.photos/id/164/800/400"
              className="w-full h-full object-cover"
              alt="Map View"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <Heading
            title="Choose Pharmacy"
            textSize="text-[20px]"
            className="font-bold text-[#1A202C]"
          />
          <div className="border border-[#D4CFCC] rounded-[15px] overflow-hidden bg-white min-h-[300px]">
            <DataTable
              columns={PHARMACY_COLUMNS}
              data={PHARMACY_DUMMY_DATA}
              customStyles={commonTableStyles}
              pagination
              paginationComponent={() => (
                <Pagination
                  totalRows={PHARMACY_DUMMY_DATA.length}
                  currentPage={1}
                  totalPages={1}
                  limit={10}
                  onChangePage={() => {}}
                  onChangeLimit={() => {}}
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end items-center gap-6 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-[#A3948C] font-bold text-[18px] hover:text-[#271100]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#705295] text-white px-8 py-3 rounded-xl font-bold text-[16px] hover:bg-[#5e447e] transition-colors"
          >
            Update Pharmacy
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdatePharmacyModal;
