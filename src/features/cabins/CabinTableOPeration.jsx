import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOPeration() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
         
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOPeration;