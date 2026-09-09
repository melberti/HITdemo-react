import { useUpdateVenue } from "./useUpdateVenue";
import { formatPhoneNumber } from "../../utilities/utilities";
import { formatWithLongDay } from "../../utilities/dateTimeFormats";
import Modal from "../../ui/Modal";
import AddVenue from "../../pages/AddVenue";
import Button from "../../ui/Button";
import ConfirmAction from "../../ui/ConfirmAction";

function VenueDashboardItem({ venue }) {
  const { isUpdating, updateVenue } = useUpdateVenue();

  function markVenueClosed() {
    updateVenue({
      id: venue.id,
      name: venue.name,
      address1: venue.address,
      city: venue.city,
      state: venue.state,
      zipCode: venue.zipCode,
      url: venue.url,
      phone: venue.phone,
      isRetired: true,
    });
  }

  return (
    <div className="contents">
      <div>
        {venue.name}{" "}
        {venue.isRetired && (
          <>
            <br />
            <span className="cancelled">CLOSED</span>
          </>
        )}
      </div>
      <div>
        {venue.address1}
        <br />
        {venue.city}, {venue.state} {venue.zipCode}
      </div>
      <div>{formatPhoneNumber(venue.phone)}</div>
      <div>{venue.url}</div>
      <div>{formatWithLongDay(venue.created_at)}</div>
      <div className="content flex gap-2">
        <Modal>
          {!venue.isRetired && (
            <>
              <Modal.Open opens="edit">
                <Button
                  color="primary"
                  size="small"
                  type="button"
                  disabled={isUpdating}
                >
                  Edit
                </Button>
              </Modal.Open>

              <Modal.Open opens="mark">
                <Button
                  color="secondary"
                  size="small"
                  type="button"
                  disabled={isUpdating}
                >
                  Mark as Closed
                </Button>
              </Modal.Open>
            </>
          )}
          <Modal.Window name="edit">
            <AddVenue venue={venue} />
          </Modal.Window>
          <Modal.Window name="mark">
            <ConfirmAction
              action="mark as closed"
              objectName={`the venue ${venue.name}`}
              onConfirm={() => markVenueClosed(venue.id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default VenueDashboardItem;
