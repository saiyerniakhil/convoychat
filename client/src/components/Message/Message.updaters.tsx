import {
  GetRoomDocument,
  Message as IMessage,
  DeleteMessageMutation,
} from "graphql/generated/graphql";
import { MutationUpdaterFn } from "apollo-client";

const deleteMessageMutationUpdater: MutationUpdaterFn<DeleteMessageMutation> = (
  cache,
  { data }
) => {
  let roomId = data.deleteMessage.roomId;
  const { getRoom } = cache.readQuery({
    query: GetRoomDocument,
    variables: { roomId },
  });

  cache.writeQuery({
    query: GetRoomDocument,
    variables: { roomId },
    data: {
      getRoom: {
        ...getRoom,
        messages: getRoom.messages.filter(
          (m: IMessage) => m.id !== data.deleteMessage.id
        ),
      },
    },
  });
};

export { deleteMessageMutationUpdater };