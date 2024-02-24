import { Box } from "metashrew-as/assembly/utils/box"
import { input } from "metashrew-as/assembly/indexer/index";
import { parsePrimitive } from "metashrew-as/assembly/utils/utils";
import { Block } from "metashrew-as/assembly/blockdata/block";

import { console } from "metashrew-as/assembly/utils/logging";

export function _start(): void {
  const data = input();
  const box = Box.from(data);
  const height = parsePrimitive<u32>(box);
  const block = new Block(box);
  console.log("got block " + height.toString(10));
}
