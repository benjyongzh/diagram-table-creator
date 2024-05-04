import { memo } from "react";
import { Handle } from "reactflow";
import CustomNodeVariant from "Types/customNodeVariant";

// const CustomComponentNode = (data: CustomNodeVariant) => {
//   return (
//     <div>
//       <div>CustomComponentNode {data.nodeName}</div>
//       {data.handleTypes.map((handleType) =>
//         Array.from({ length: handleType.quantity }).map((_item, index) => (
//           <Handle
//             id={`${data.nodeName} port ${index.toString()}`}
//             type={handleType.handleType}
//             position={handleType.position} //position should depend on value of handleCount
//           />
//         ))
//       )}
//     </div>
//   );
// };
export default memo(({ data }: { data: CustomNodeVariant }) => {
  return (
    <div>
      <div>CustomComponentNode {data.nodeName}</div>
      {data.handleTypes.map((handleType) =>
        Array.from({ length: handleType.quantity }).map((_item, index) => (
          <Handle
            id={`${data.nodeName} port ${index.toString()}`}
            type={handleType.handleType}
            position={handleType.position} //position should depend on value of handleCount
          />
        ))
      )}
    </div>
  );
});

// export default memo(CustomComponentNode);
// export default CustomComponentNode;
