import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
// compund component pattern in which the model component will manage its state whether it is open or close, unlike the addCABIN component which decides whether the model will open or close
export default function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button
          variation="primary"
          size="medium"
          > add new cabin</Button>
          </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        <Modal.Open opens="table">
        <Button
          variation="primary"
          size="medium"
          > show table</Button>
          </Modal.Open >
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window>
    </Modal>
  );
}

// export default function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false);
//   return (
//     <div>
//       {" "}
//       <Button variation="primary" size="medium" onClick={() => setIsOpenModel((show) => !show)}>
//         add new cabin
//       </Button>
//       {isOpenModel && <Modal onClose={()=>setIsOpenModel(false)}><CreateCabinForm onCloseModel={()=>setIsOpenModel(false)}/></Modal>}
//     </div>
//   );
// }
