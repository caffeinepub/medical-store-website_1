import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import List "mo:core/List";
import Migration "migration";

(with migration = Migration.run)
actor {
  type StoreInfo = {
    name : Text;
    address : Text;
    phone : Text;
    hours : Text;
  };

  type Product = {
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    available : Bool;
  };

  type Category = {
    name : Text;
    description : Text;
  };

  let categoryMap = Map.empty<Text, Category>();
  let productMap = Map.empty<Text, Product>();

  public query ({ caller }) func getStoreInfo() : async StoreInfo {
    {
      name = "Sameer Medical";
      address = "Shahabad, Karnataka, India";
      phone = "0000999988";
      hours = "Mon-Sun: 10:00 AM – 3:00 PM & 6:00 PM – 10:00 PM";
    };
  };

  public query ({ caller }) func getCategories() : async [Category] {
    categoryMap.values().toArray();
  };

  public query ({ caller }) func getProductByCategory(category : Text) : async [Product] {
    productMap.values().toArray().filter(
      func(p) { p.category == category }
    );
  };

  public query ({ caller }) func searchProductsByName(searchTerm : Text) : async [Product] {
    let results = List.empty<Product>();
    for (product in productMap.values()) {
      if (product.name.contains(#text searchTerm)) {
        results.add(product);
      };
    };
    results.toArray();
  };
};
