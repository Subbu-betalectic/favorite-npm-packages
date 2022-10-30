import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextAreaBase,
  TextInputBase,
  BetaForm as useBetaForm,
  LabelBase,
  ButtonBase,
} from "@reusejs/react";

import {
  getPackageById,
  updatePackageDescription,
} from "../services/packageHandler";

const validation_constraints = {
  packageDescription: {
    presence: {
      allowEmpty: false,
      message: "^Please enter package description",
    },
  },
};

export default function EditPackage() {
  const { id } = useParams();
  let navigate = useNavigate();

  const editPackagesForm = useBetaForm({
    packageName: "",
    packageDescription: "",
  });

  const saveDetails = () => {
    if (editPackagesForm.validate()) {
      updatePackageDescription(
        id,
        editPackagesForm.getField("packageDescription")
      );
      navigate("/");
    }
  };

  useEffect(() => {
    editPackagesForm.setValidationRules(validation_constraints);
  }, []);

  useEffect(() => {
    const findPackageById = getPackageById(id);

    editPackagesForm.setField(
      "packageName",
      findPackageById?.package?.label || ""
    );
    editPackagesForm.setField(
      "packageDescription",
      findPackageById?.packageDescription || ""
    );
  }, []);

  return (
    <div className="mx-40 mt-20">
      <div className="w-60">
        <TextInputBase
          labelBaseProps={{
            label: "Package Name",
            variant: "heading",
          }}
          type="text"
          variant="primary"
          name="packageName"
          placeholder="Package name"
          disabled={true}
          value={editPackagesForm.getField("packageName")}
        />
      </div>

      <div className="mt-6">
        <TextAreaBase
          labelBaseProps={{
            label: "Why is this your fav ?",
            variant: "heading",
          }}
          variant="primary"
          placeholder="Why is this your fav ?"
          name="packageDescription"
          value={editPackagesForm.getField("packageDescription")}
          onChange={(val) => {
            editPackagesForm.setField("packageDescription", val);
          }}
          error={
            editPackagesForm.errors.get("packageDescription")?.length > 0 ? (
              <LabelBase
                label={editPackagesForm.errors.get("packageDescription")[0]}
                variant="error"
              />
            ) : null
          }
        />
      </div>
      <div className="w-full flex justify-end items-end mt-8">
        <ButtonBase
          label="Submit"
          variant="secondary"
          onClick={() => saveDetails()}
        />
      </div>
    </div>
  );
}
