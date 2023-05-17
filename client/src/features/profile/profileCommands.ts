import { Command } from "../../redux/Command";
import { errorHappened, profileLoaded } from "./ProfileSlice";

export const getProfileCommand =
  (): Command =>
  async (dispatch, getState, { repositories }) => {
    try {
      dispatch(profileLoaded(repositories.profileRepository.getProfile()));
    } catch (error: any) {
      // const errorMessage = ErrorHandler.errored(e, ErrorCodes.GET_CUSTOMER_ERROR);
      // dispatch(errorHappened(errorMessage));
    }
  };
