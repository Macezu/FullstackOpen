import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ContainerSignIn from "../../../components/logInComponents/ContainerSignIn"

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(<ContainerSignIn onSubmit={onSubmit} />);

      const username = getByTestId("user");
      const password = getByTestId("pass");
      
      fireEvent.changeText(username, "matti");
      fireEvent.changeText(password, "password");
      fireEvent.press(getByTestId("signIn"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "matti",
          password: "password",
        });
      });
    });
  });
});