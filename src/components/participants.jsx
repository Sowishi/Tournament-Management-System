import ParticipantsTables from "./participantsTable";

const Participants = ({ participants }) => {
  return (
    <div className="participants my-20">
      <div className="wrapper flex items-center my-5">
        <h1 className="text-white text-3xl font-bold">
          Tournament Participants
        </h1>
        <Badge className="ml-3">{participants.length}</Badge>
      </div>
      {participants.length <= 0 && (
        <h1 className="text-white text-center text-3xl">
          No Participants yet.
        </h1>
      )}
      {participants.length >= 1 && (
        <ParticipantsTables
          client={true}
          removeRanking={true}
          tournament={tournament}
          handleDeleteParticipant={handleDeleteParticipant}
          participants={participants}
        />
      )}
    </div>
  );
};

export default Participants;
