import dns from "dns";

dns.resolveSrv(
  "_mongodb._tcp.cluster0.z1qga1u.mongodb.net",
  (err, records) => {
    console.log(err);
    console.log(records);
  }
);

