import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Button, Image } from "@themesberg/react-bootstrap";
import moment from "moment";
import { useDispatch } from "react-redux";
import DOMPurify from "dompurify";

import { deleteTrip, likeTrip } from "../../../actions/trips";
import Avatar from "../../Avatar/Avatar";

const Trip = ({ trip, setCurrentId, setShowDefault }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleEdit = () => {
    setShowDefault(true);
    setCurrentId(trip._id);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const Likes = () => {
    if (trip.likes.length > 0) {
      return trip.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <FontAwesomeIcon icon={faThumbsUp} />
          &nbsp;
          {trip.likes.length > 2
            ? `You and ${trip.likes.length - 1} others`
            : `${trip.likes.length} like${trip.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faThumbsUp} />
          &nbsp;{trip.likes.length} {trip.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <FontAwesomeIcon icon={faThumbsUp} />
        &nbsp;Like
      </>
    );
  };

  return (
    <Col className="">
      <Card
        border="primary"
        className="text-center"
        style={{ height: "22rem" }}
      >
        {(user?.result?.googleId === trip?.creator ||
          user?.result?._id === trip.creator) && (
          <div
            className="position-absolute float-end"
            style={{ right: "-.25rem", top: "-.75rem" }}
          >
            <Button
              variant="info"
              className="btn-icon-only btn-circle"
              onClick={handleEdit}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </div>
        )}
        <Card.Body className="p-3">
          <Card.Header
            className="center-align p-1 truncate-text"
            as="h4"
            style={{
              height: "3rem",
            }}
          >
            {trip.title}
          </Card.Header>
          <Card.Text
            className="multiline-ellipsis mt-2 mb-2"
            dangerouslySetInnerHTML={createMarkup(trip.body)}
            style={{
              height: "8rem",
            }}
          ></Card.Text>
          <div className="d-flex justify-content-center pb-3">
            {trip?.user?.image ? (
              <Image
                src={trip.image}
                alt={trip.name}
                className="user-avatar md-avatar rounded-circle"
              />
            ) : (
              <Avatar name={trip.name} size={28} />
            )}
            <div className="ms-2 align-items-center align-self-center">
              <span className="font-small fw-bold">{trip.name}</span>
            </div>
          </div>
          <Card.Subtitle className="text-muted font-small fw-bold">
            {moment(trip.createdAt).fromNow()}
          </Card.Subtitle>
          <Card.Footer className="pt-2">
            <Button
              variant=""
              size="sm"
              color="dark"
              className="w-100 btn-link"
              onClick={() => {}}
              bsPrefix="text"
            >
              view trip
            </Button>
            <Button
              variant=""
              size="m"
              className="animate-up-2 w-50 btn-link position-absolute float-end"
              disabled={!user?.result}
              onClick={() => dispatch(likeTrip(trip._id))}
              style={{ left: "-1rem", bottom: "0rem" }}
            >
              <Likes />
            </Button>
            {(user?.result?.googleId === trip?.creator ||
              user?.result?._id === trip.creator) && (
              <Button
                variant=""
                size="m"
                className="animate-down-2 w-50 btn-link position-absolute float-end"
                onClick={() => dispatch(deleteTrip(trip._id))}
                style={{ right: "-1rem", bottom: "0rem" }}
              >
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
              </Button>
            )}
          </Card.Footer>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Trip;
