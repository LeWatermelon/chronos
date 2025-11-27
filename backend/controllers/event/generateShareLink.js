import Event from "../../database/models/Event.js";
import Calendar from "../../database/models/Calendar.js";
import crypto from "crypto";

export default async function handleGenerateEventShareLink(req, res) {
  try {
    const { eventId } = req.params;
    const { permission = "view" } = req.body;
    const userId = req.session?.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check permissions
    const calendar = await Calendar.findById(event.calendar_id);
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    const isOwner = calendar.owner.toString() === userId;
    const isMember = calendar.members?.some(
      memberId => String(memberId) === userId
    );

    if (!isOwner && !isMember) {
      return res.status(403).json({ error: "Only calendar members can generate share links" });
    }

    // Check if a public share link already exists
    if (!event.shared_with) {
      event.shared_with = [];
    }

    const existingPublicShare = event.shared_with.find(
      share => !share.email && share.permission === permission && share.shareToken
    );

    if (existingPublicShare) {
      const shareLink = `http://localhost:5173/event/shared/${existingPublicShare.shareToken}`;
      return res.json({ 
        message: "Share link already exists", 
        shareLink,
        shareToken: existingPublicShare.shareToken 
      });
    }

    // Generate new public share token
    const shareToken = crypto.randomBytes(32).toString('hex');

    const shareEntry = {
      permission,
      accepted: true,
      shareToken,
      sharedBy: userId,
      sharedAt: new Date()
      // No email - public link
    };

    event.shared_with.push(shareEntry);
    await event.save();

    const shareLink = `http://localhost:5173/event/shared/${shareToken}`;

    res.json({ 
      message: "Share link generated successfully", 
      shareLink,
      shareToken
    });
  } catch (error) {
    console.error("Generate event share link error:", error);
    res.status(500).json({ error: error.message });
  }
}