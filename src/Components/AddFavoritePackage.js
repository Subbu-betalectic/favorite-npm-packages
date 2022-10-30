import React, { useEffect } from "react";
import {
  PickerRadioSimple,
  TextAreaBase,
  TextInputBase,
  BetaForm as useBetaForm,
  LabelBase,
  ButtonBase,
} from "@reusejs/react";
import { useNavigate } from "react-router-dom";

import { savePackage } from "../services/packageHandler";

const validation_constraints = {
  package: {
    presence: {
      allowEmpty: false,
      message: "^Please select package",
    },
  },
  packageDescription: {
    presence: {
      allowEmpty: false,
      message: "^Please enter package description",
    },
  },
};

export default function AddFavoritePackage() {
  let navigate = useNavigate();

  const packagesForm = useBetaForm({
    search: "",
    package: {},
    packageDescription: "",
  });
  console.log("packageForm", packagesForm);

  const getPackageData = async () => {
    try {
      let q = packagesForm.getField("search") || "reactjs";
      const res = await fetch(`https://api.npms.io/v2/search?q=${q}`).then(
        (response) => {
          return response.json();
        }
      );
      const result = res.results.map((item) => {
        return { label: item.package.name, value: item.package.name };
      });
      return result;
    } catch (e) {
      console.log("error while calling api", e);
    }
  };

  useEffect(() => {
    packagesForm.setValidationRules(validation_constraints);
  }, []);

  const saveDetails = () => {
    if (packagesForm.validate()) {
      const payload = {
        package: packagesForm.getField("package"),
        packageDescription: packagesForm.getField("packageDescription"),
        id: Date.now(),
      };
      savePackage(payload);
      navigate("/");
    }
  };

  return (
    <div className="mx-40 mt-20">
      <div>
        <TextInputBase
          labelBaseProps={{
            label: "Search for NPM Packages",
            variant: "heading",
          }}
          type="text"
          variant="primary"
          placeholder="Search for NPM Packages"
          name="search"
          onChange={(val) => {
            packagesForm.setField("search", val);
          }}
        />
      </div>
      <div className="mt-4">
        <LabelBase label="Results" variant="subHeading" />
      </div>
      <div className="mt-4 h-40 overflow-scroll">
        <PickerRadioSimple
          dataSource={async () => {
            const packageNames = await getPackageData();
            return packageNames;
          }}
          defaultSelected={[packagesForm.getField("package")]}
          name="package"
          onChange={(val) => {
            packagesForm.setField("package", val);
          }}
          scrollableBaseProps={{
            scrollableBaseClasses: {
              textColor: "text-black",
              background: "bg-white",
              border: "border-0",
              borderRadius: 10,
              position: "z-50 block space-y-4 ",
            },
          }}
          radioBoxStyleClasses={{
            wrapper: "mt-0 flex",
            borderRadius: "rounded-full",
            border: "border border-blue-900 bg-white ",
            focus:
              "focus:border-gray-500 focus:ring-gray-400 checked:bg-blue-500 ",
            padding: "p-2",
            backgroundColor: "bg-white",
          }}
          radioOptionLabelClasses={{
            color: "text-black",
          }}
          refresh={packagesForm.getField("search")}
        />
      </div>
      {packagesForm.errors.get("package")?.length > 0 && (
        <div className="mt-2">
          <LabelBase
            label={packagesForm.errors.get("package")[0]}
            variant="error"
          />
        </div>
      )}
      <div className="mt-6">
        <TextAreaBase
          labelBaseProps={{
            label: "Why is this your fav ?",
            variant: "heading",
          }}
          variant="primary"
          placeholder="Why is this your fav ?"
          name="packageDescription"
          onChange={(val) => {
            packagesForm.setField("packageDescription", val);
          }}
          error={
            packagesForm.errors.get("packageDescription")?.length > 0 ? (
              <LabelBase
                label={packagesForm.errors.get("packageDescription")[0]}
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
