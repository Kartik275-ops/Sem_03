                         const EventEmitter = require("events");

                          const button = new EventEmitter();

                          button.on("click", () => {
                                            console.log("Button was clicked!");
                            });

                          button.emit("click");
