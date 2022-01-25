// eslint-disable-next-line import/no-extraneous-dependencies
import {
  auth,
  between,
  equal,
  newData,
  node,
  param,
  props,
  validate,
  write,
} from "@jahed/firebase-rules";

export const rules = {
  rules: node(
    props({
      rooms: node(
        param("$roomID", () =>
          node(
            props({
              config: node(
                props({
                  hideLabel: node(
                    validate(
                      newData.isString((newVal) =>
                        newVal.matches(/monkey|chicken|cow|fish/)
                      )
                    )
                  ),
                  isFreezeAfterVote: node(validate(newData.isBoolean())),
                })
              ),
              room: node(
                props({
                  isPrivate: node(validate(newData.isBoolean())),
                  name: node(validate(newData.isString())),
                  password: node(validate(newData.isString())),
                })
              ),
              task: node(
                props({
                  description: node(validate(newData.isString())),
                  name: node(validate(newData.isString())),
                })
              ),
              users: node(
                param("$userID", ($userID) =>
                  node(
                    props({
                      name: node(validate(newData.isString())),
                      role: node(validate(newData.isString())),
                      point: node(
                        validate(
                          newData.isNumber((newVal) => between(newVal, -1, 101))
                        )
                      ),
                    }),
                    write(equal($userID, auth.uid)),
                    validate(newData.hasChildren(["name", "role"]))
                  )
                )
              ),
            })
          )
        )
      ),
    })
  ),
};
