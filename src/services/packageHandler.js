export const getPackages = () => {
  const packageList = localStorage.getItem("packages");
  console.log("package ,,,", packageList);
  if (packageList) {
    return JSON.parse(packageList);
  } else {
    return [];
  }
};

export const savePackage = (payload) => {
  console.log("save package callaed", payload);
  const existingPackages = getPackages();
  console.log("existing", existingPackages);
  existingPackages.push(payload);
  const packagesStr = JSON.stringify(existingPackages);
  localStorage.setItem("packages", packagesStr);
};

export const removePackage = (id) => {
  const existingPackages = getPackages();
  console.log("remove packages", existingPackages, id);
  const index = existingPackages.findIndex((item) => item.id === id);
  console.log("index", index);
  if (index !== -1) {
    existingPackages.splice(index, 1);
    console.log("new existing packages", existingPackages);
    const newPackagesStr = JSON.stringify(existingPackages);
    localStorage.setItem("packages", newPackagesStr);
  }
};

export const updatePackageDescription = (id, description) => {
  console.log("update", id, description);
  const existingPackages = getPackages();
  const index = existingPackages.findIndex((item) => item.id.toString() === id);
  console.log("index....", index);
  if (index !== -1) {
    existingPackages[index].packageDescription = description;
    const updatedPackageStr = JSON.stringify(existingPackages);
    localStorage.setItem("packages", updatedPackageStr);
  }
};

export const getPackageById = (id) => {
  const packages = getPackages();
  const findPackageById = packages.find((item) => item.id.toString() === id);
  return findPackageById;
};
