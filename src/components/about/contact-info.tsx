
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

interface ContactInfoProps {
  siteInfo: Record<string, string>;
}

export const ContactInfo = ({ siteInfo }: ContactInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Get in Touch
        </CardTitle>
        <CardDescription>
          Connect with me on various platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {siteInfo.contact_email && (
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
              <Mail className="w-4 h-4" />
              {siteInfo.contact_email}
            </Badge>
          )}
          {siteInfo.github_url && (
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
              <Github className="w-4 h-4" />
              GitHub
            </Badge>
          )}
          {siteInfo.linkedin_url && (
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Badge>
          )}
          {siteInfo.twitter_url && (
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
              <Twitter className="w-4 h-4" />
              Twitter
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
