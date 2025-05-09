import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { acceptFriendRequest, getFriendRequests } from "../lib/api.js";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound.jsx";

const NotificationsPage = () => {

  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  })

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] })
      queryClient.invalidateQueries({ queryKey: ["friends"] })
    }
  });

  const incomingRequests = friendRequests?.incomingReqs || []
  const acceptedRequests = friendRequests?.acceptedReqs || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notifications</h1>
        {
          isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              {
                incomingRequests.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <UserCheckIcon className="mr-2 size-5" />
                      Friend Requests
                      <span className="ml-2 badge badge-primary">{incomingRequests.length}</span>
                    </h2>

                    <div className="grid grid-cols-1 gap-4">
                      {
                        incomingRequests.map((request) => (
                          <div key={request._id} className="card bg-base-100 shadow-xl p-4">
                            <div className="card-body p-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="avatar mr-4">
                                    <div className="w-12 rounded-full">
                                      <img src={request.sender.profilePic} alt={request.sender.fullName} />
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-semibold">{request.sender.fullName}</h3>
                                    <div className="flex flex-wrap gap-1.5 text-sm opacity-70">
                                      <span className="badge badge-outline badge-sm">
                                        Native: {request.sender.nativeLanguage}
                                      </span>
                                      <span className="badge badge-outline badge-sm">
                                        Learning: {request.sender.learningLanguage}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => acceptRequestMutation(request._id)}
                                  disabled={isPending}
                                >
                                  Accept
                                </button>

                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </section>
                )
              }

              {acceptedRequests.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <BellIcon className="mr-2 size-5" />
                    New Connections
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    {acceptedRequests.map((notification) => (
                      <div key={notification._id} className="card bg-base-100 shadow-xl p-4">
                        <div className="card-body p-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="avatar mr-4">
                                <div className="w-12 rounded-full">
                                  <img
                                    src={notification.recipient.profilePic}
                                    alt={notification.recipient.fullName}
                                  />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">{notification.recipient.fullName}</h3>
                                <p className="text-sm opacity-80">
                                  {notification.recipient.fullName} accepted your friend request
                                </p>
                                <p className="text-xs opacity-60 flex items-center">
                                  <ClockIcon className="size-3 mr-1" />
                                  Recently
                                </p>
                              </div>
                            </div>
                            <div className="text-sm opacity-70 flex items-center">
                              <MessageSquareIcon className="size-4 mr-1" />
                              New Friend
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
                <NoNotificationsFound />
              )}

            </>
          )
        }
      </div>
    </div>
  )
}

export default NotificationsPage
